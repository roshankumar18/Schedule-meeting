ALTER TABLE "availability" ALTER COLUMN "user_id" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "availability" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "id";