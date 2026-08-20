CREATE TABLE `acquisition_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`objective` varchar(80) NOT NULL,
	`propertyType` varchar(120) NOT NULL,
	`regions` text NOT NULL,
	`budget` varchar(120) NOT NULL,
	`paymentMethod` varchar(120) NOT NULL,
	`timeline` varchar(120) NOT NULL,
	`mustHaves` text NOT NULL,
	`priorities` text NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `acquisition_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` varchar(32) NOT NULL DEFAULT 'user';