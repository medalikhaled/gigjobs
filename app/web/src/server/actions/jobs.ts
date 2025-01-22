"use server";

import { z } from "zod";
import { db } from "~/server/db";
import { jobs, jobApplications } from "~/server/db/schema";
import { nanoid } from "nanoid";
import { eq, desc, sql } from "drizzle-orm";

const jobSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  description: z.string().min(1),
  deliveryTime: z.string().min(1),
  requirements: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
});

const applicationSchema = z.object({
  jobId: z.string().min(1),
  cvLink: z.string().optional(),
  motivationLetter: z.string().min(1),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url(),
  })).optional(),
});

export async function createJob(data: z.infer<typeof jobSchema>, userId: string) {
  try {
    const jobData = jobSchema.parse(data);
    const job = await db.insert(jobs).values({
      id: nanoid(),
      ...jobData,
      createdById: userId,
      applicantsCount: 0,
    });

    return { success: true, jobId: job.lastInsertRowid };
  } catch (error) {
    console.error("Job creation error:", error);
    throw error;
  }
}

export async function listJobs(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const jobsList = await db.query.jobs.findMany({
      orderBy: [desc(jobs.createdAt)],
      limit,
      offset,
      with: {
        creator: {
          columns: {
            name: true,
            email: true,
          },
        },
      },
    });

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobs)
      .then((res) => res[0]);

    if (!result) {
      throw new Error("Failed to get job count");
    }

    return {
      jobs: jobsList,
      total: result.count,
      page,
      totalPages: Math.ceil(result.count / limit),
    };
  } catch (error) {
    console.error("List jobs error:", error);
    throw error;
  }
}

export async function getJob(jobId: string) {
  try {
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, jobId),
      with: {
        creator: {
          columns: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  } catch (error) {
    console.error("Get job error:", error);
    throw error;
  }
}

export async function applyToJob(
  data: z.infer<typeof applicationSchema>,
  userId: string
) {
  try {
    const applicationData = applicationSchema.parse(data);

    // Check if user has already applied
    const existingApplication = await db.query.jobApplications.findFirst({
      where: (apps) =>
        eq(apps.jobId, applicationData.jobId) && eq(apps.applicantId, userId),
    });

    if (existingApplication) {
      throw new Error("You have already applied to this job");
    }

    // Create application
    await db.insert(jobApplications).values({
      id: nanoid(),
      ...applicationData,
      applicantId: userId,
      socialLinks: applicationData.socialLinks
        ? JSON.stringify(applicationData.socialLinks)
        : null,
    });

    // Increment applicants count
    await db
      .update(jobs)
      .set({ applicantsCount: sql`${jobs.applicantsCount} + 1` })
      .where(eq(jobs.id, applicationData.jobId));

    return { success: true };
  } catch (error) {
    console.error("Job application error:", error);
    throw error;
  }
}

export async function listApplications(jobId: string, userId: string) {
  try {
    // Check if user is the job creator
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, jobId),
      columns: { createdById: true },
    });

    if (!job || job.createdById !== userId) {
      throw new Error("Unauthorized");
    }

    const applications = await db.query.jobApplications.findMany({
      where: eq(jobApplications.jobId, jobId),
      with: {
        applicant: {
          columns: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: [desc(jobApplications.createdAt)],
    });

    return applications;
  } catch (error) {
    console.error("List applications error:", error);
    throw error;
  }
}
