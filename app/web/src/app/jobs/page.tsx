"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthStore } from "~/stores/authStore";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { listJobs } from "~/server/actions/jobs";
import Link from "next/link";
import { MapIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

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
  creator: {
    name: string | null;
    email: string;
  };
}

export default function JobsPage() {
  const router = useRouter();
  const { status } = useSession();
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('q') || "";
    }
    return "";
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await listJobs(page, 10, debouncedSearch);
        setJobs(result.jobs);
        setTotalPages(result.totalPages);
      } catch (error) {
        setError("Failed to load jobs");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [page, debouncedSearch]);

  if (status === "loading" || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Available Jobs</h1>
          {user.role === "employer" && (
            <Button asChild>
              <Link href="/jobs/post">Post a Job</Link>
            </Button>
          )}
        </div>
        <Input
          type="search"
          placeholder="Search jobs by title, company, or description..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="max-w-xl"
        />
      </div>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-3 rounded bg-gray-200" />
                  <div className="h-3 rounded bg-gray-200" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="h-full cursor-pointer p-6 transition-shadow hover:shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>

                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      {job.location && (
                        <div className="flex items-center gap-1">
                          <MapIcon className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{job.deliveryTime}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <CurrencyDollarIcon className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {job.applicantsCount} applicant{job.applicantsCount !== 1 && "s"}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
