import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `web_${name}`);

export const jobs = createTable(
  "job",
  {
    id: text("id", { length: 255 }).notNull().primaryKey(),
    title: text("title", { length: 255 }).notNull(),
    company: text("company", { length: 255 }).notNull(),
    description: text("description").notNull(),
    deliveryTime: text("deliveryTime", { length: 255 }).notNull(),
    requirements: text("requirements"),
    salary: text("salary", { length: 255 }),
    location: text("location", { length: 255 }),
    applicantsCount: int("applicantsCount").default(0).notNull(),
    createdById: text("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int("createdAt", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
  },
  (job) => ({
    createdByIdIdx: index("job_createdById_idx").on(job.createdById),
    titleIdx: index("job_title_idx").on(job.title),
  })
);

export const jobApplications = createTable(
  "jobApplication",
  {
    id: text("id", { length: 255 }).notNull().primaryKey(),
    jobId: text("jobId", { length: 255 })
      .notNull()
      .references(() => jobs.id),
    applicantId: text("applicantId", { length: 255 })
      .notNull()
      .references(() => users.id),
    cvLink: text("cvLink"),
    motivationLetter: text("motivationLetter").notNull(),
    socialLinks: text("socialLinks"), // JSON string of social media links
    status: text("status", { length: 50 }).default("pending").notNull(),
    createdAt: int("createdAt", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
  },
  (application) => ({
    jobIdIdx: index("application_jobId_idx").on(application.jobId),
    applicantIdIdx: index("application_applicantId_idx").on(application.applicantId),
  })
);

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  creator: one(users, { fields: [jobs.createdById], references: [users.id] }),
  applications: many(jobApplications),
}));

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobs, { fields: [jobApplications.jobId], references: [jobs.id] }),
  applicant: one(users, { fields: [jobApplications.applicantId], references: [users.id] }),
}));

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  password: text("password", { length: 255 }),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
  role: text("role", { length: 255 }).default("employee").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
