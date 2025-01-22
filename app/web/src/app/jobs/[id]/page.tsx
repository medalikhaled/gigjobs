"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthStore } from "~/stores/authStore";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Card } from "~/components/ui/card";
import { getJob, applyToJob, listApplications, hasApplied } from "~/server/actions/jobs";
import {
  MapIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  deliveryTime: string;
  requirements?: string | null;
  salary?: string | null;
  location?: string | null;
  applicantsCount: number;
  createdAt: Date;
  createdById: string;
  creator: {
    name: string | null;
    email: string;
  };
}

interface Application {
  id: string;
  cvLink?: string | null;
  motivationLetter: string;
  socialLinks?: string | null;
  status: string;
  createdAt: Date;
  applicant: {
    name: string | null;
    email: string;
    image: string | null;
  };
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { status } = useSession();
  const { user } = useAuthStore();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [hasUserApplied, setHasUserApplied] = useState(false);
  const [applicationData, setApplicationData] = useState({
    cvLink: "",
    motivationLetter: "",
    socialLinks: [{ platform: "", url: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [jobData, userHasApplied] = await Promise.all([
          getJob(params.id),
          hasApplied(params.id, user.id)
        ]);
        
        setJob(jobData);
        setHasUserApplied(userHasApplied);

        if (user.role === "employer" && user.id === jobData.createdById) {
          const applicationsData = await listApplications(params.id, user.id);
          setApplications(applicationsData);
        }
      } catch (error) {
        setError("Failed to load job details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, user]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) throw new Error("Not authenticated");

      const validSocialLinks = applicationData.socialLinks.filter(
        (link) => link.platform && link.url,
      );

      await applyToJob(
        {
          jobId: params.id,
          cvLink: applicationData.cvLink || undefined,
          motivationLetter: applicationData.motivationLetter,
          socialLinks:
            validSocialLinks.length > 0 ? validSocialLinks : undefined,
        },
        user.id,
      );

      router.push("/jobs");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to apply");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!job || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error || "Job not found"}</p>
      </div>
    );
  }

  return user ? (
    <main className="container mx-auto py-10">
      <Card className="p-8">
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-xl text-muted-foreground">{job.company}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-muted-foreground">
            {job.location && (
              <div className="flex items-center gap-2">
                <MapIcon className="h-5 w-5" />
                <span>{job.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>{job.deliveryTime}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              <span>{job.applicantsCount} applicants</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {job.description}
              </p>
            </div>

            {job.requirements && (
              <div>
                <h2 className="text-xl font-semibold">Requirements</h2>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {job.requirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {user?.role === "employee" && !showApplicationForm && (
          <Button
            className="w-full"
            onClick={() => setShowApplicationForm(true)}
            disabled={hasUserApplied}
          >
            {hasUserApplied ? "Applied" : "Apply Now"}
          </Button>
        )}

        {showApplicationForm && (
          <form onSubmit={handleApply} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cvLink">CV/Resume Link (Optional)</Label>
                <Input
                  id="cvLink"
                  type="url"
                  placeholder="Link to your CV/Resume"
                  value={applicationData.cvLink ?? ""}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      cvLink: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="motivationLetter">Motivation Letter</Label>
                <Textarea
                  id="motivationLetter"
                  placeholder="Why are you interested in this position?"
                  className="h-40"
                  required
                  value={applicationData.motivationLetter}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      motivationLetter: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Social Media Links (Optional)</Label>
                {applicationData.socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Platform (e.g., LinkedIn)"
                      value={link.platform}
                      onChange={(e) => {
                        const newLinks = [...applicationData.socialLinks];
                        if (newLinks[index])
                          newLinks[index].platform = e.target.value;
                        setApplicationData((prev) => ({
                          ...prev,
                          socialLinks: newLinks,
                        }));
                      }}
                    />
                    <Input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...applicationData.socialLinks];
                        if (newLinks[index])
                          newLinks[index].url = e.target.value;
                        setApplicationData((prev) => ({
                          ...prev,
                          socialLinks: newLinks,
                        }));
                      }}
                    />
                    {index === applicationData.socialLinks.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setApplicationData((prev) => ({
                            ...prev,
                            socialLinks: [
                              ...prev.socialLinks,
                              { platform: "", url: "" },
                            ],
                          }))
                        }
                      >
                        Add
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApplicationForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}

        {user?.role === "employer" && user?.id === job.createdById && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">Applications</h2>
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {application.applicant.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {application.applicant.email}
                        </p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                        {application.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-medium">Motivation Letter</h4>
                      <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {application.motivationLetter}
                      </p>
                    </div>

                    {application.cvLink && (
                      <div>
                        <h4 className="font-medium">CV/Resume</h4>
                        <a
                          href={application.cvLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View CV/Resume
                        </a>
                      </div>
                    )}

                    {application.socialLinks && (
                      <div>
                        <h4 className="font-medium">Social Links</h4>
                        <div className="flex gap-2">
                          {JSON.parse(application.socialLinks).map(
                            (
                              link: { platform: string; url: string },
                              i: number,
                            ) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {link.platform}
                              </a>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                      Applied on{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}

              {applications.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No applications yet
                </p>
              )}
            </div>
          </div>
        )}
      </Card>
    </main>
  ) : null;
}
