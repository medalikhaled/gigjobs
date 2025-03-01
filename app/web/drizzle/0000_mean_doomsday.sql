CREATE TABLE `web_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `web_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `web_jobApplication` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`jobId` text(255) NOT NULL,
	`applicantId` text(255) NOT NULL,
	`cvLink` text,
	`motivationLetter` text NOT NULL,
	`socialLinks` text,
	`status` text(50) DEFAULT 'pending' NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`jobId`) REFERENCES `web_job`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`applicantId`) REFERENCES `web_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `web_job` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`company` text(255) NOT NULL,
	`description` text NOT NULL,
	`deliveryTime` text(255) NOT NULL,
	`requirements` text,
	`salary` text(255),
	`location` text(255),
	`applicantsCount` integer DEFAULT 0 NOT NULL,
	`createdById` text(255) NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`createdById`) REFERENCES `web_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `web_session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `web_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `web_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`password` text(255),
	`emailVerified` integer DEFAULT CURRENT_TIMESTAMP,
	`image` text(255),
	`role` text(255) DEFAULT 'employee' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `web_verificationToken` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `account_user_idx` ON `web_account` (`userId`);--> statement-breakpoint
CREATE INDEX `application_jobId_idx` ON `web_jobApplication` (`jobId`);--> statement-breakpoint
CREATE INDEX `application_applicantId_idx` ON `web_jobApplication` (`applicantId`);--> statement-breakpoint
CREATE INDEX `job_createdById_idx` ON `web_job` (`createdById`);--> statement-breakpoint
CREATE INDEX `job_title_idx` ON `web_job` (`title`);--> statement-breakpoint
CREATE INDEX `session_user_idx` ON `web_session` (`userId`);