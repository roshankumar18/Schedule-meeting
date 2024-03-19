CREATE TABLE IF NOT EXISTS "availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" varchar(256) NOT NULL,
	"startTime" varchar(256) NOT NULL,
	"endTime" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
