CREATE TYPE "public"."holding_type" AS ENUM('crypto', 'stock');--> statement-breakpoint
ALTER TABLE "holdings" ADD COLUMN "type" "holding_type" NOT NULL;