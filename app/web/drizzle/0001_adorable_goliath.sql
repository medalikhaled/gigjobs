DROP INDEX IF EXISTS `account_userId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `createdById_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `name_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `session_userId_idx`;--> statement-breakpoint
CREATE INDEX `account_user_idx` ON `web_account` (`userId`);--> statement-breakpoint
CREATE INDEX `post_createdById_idx` ON `web_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `post_name_idx` ON `web_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_user_idx` ON `web_session` (`userId`);