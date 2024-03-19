CREATE TABLE IF NOT EXISTS "prefrence" (
	"id" serial PRIMARY KEY NOT NULL,
	"before" varchar(256) NOT NULL,
	"after" varchar(256) NOT NULL,
	"noOfMeetings" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability" ADD CONSTRAINT "availability_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prefrence" ADD CONSTRAINT "prefrence_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
