CREATE TYPE "public"."bank_name" AS ENUM('BOURSORAMA', 'TRADE_REPUBLIC');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('EXPENSE', 'INCOME', 'BANK_ACCOUNT', 'BALANCE_SNAPSHOT');--> statement-breakpoint
CREATE TYPE "public"."expense_type" AS ENUM('GROCERIES', 'UTILITIES', 'TRANSPORTATION', 'ENTERTAINMENT', 'INVESTMENTS', 'HEALTH', 'SPORTS', 'LOAN', 'TRANSFER', 'OTHER');--> statement-breakpoint
CREATE TABLE "backend_architecture_account" (
	"user_id" uuid NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "backend_architecture_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_action" (
	"id" uuid PRIMARY KEY NOT NULL,
	"entity_id" varchar(255) NOT NULL,
	"entity_type" "entity_type" NOT NULL,
	"payload" text,
	"method_name" varchar(255) NOT NULL,
	"origin" varchar(255) NOT NULL,
	"success" boolean NOT NULL,
	"failure_reason" text,
	"previous_action_id" uuid,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_balance_snapshot" (
	"id" uuid PRIMARY KEY NOT NULL,
	"bank_account_id" uuid NOT NULL,
	"balance" integer NOT NULL,
	"recorded_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_bank_account" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"bank_name" "bank_name" NOT NULL,
	"iban" varchar(255) NOT NULL,
	"bic" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_expense" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"amount" integer NOT NULL,
	"expense_type" "expense_type" NOT NULL,
	"bank_account_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_income" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"amount" integer NOT NULL,
	"bank_account_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "backend_architecture_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "backend_architecture_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "backend_architecture_account" ADD CONSTRAINT "backend_architecture_account_user_id_backend_architecture_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."backend_architecture_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_action" ADD CONSTRAINT "backend_architecture_action_user_id_backend_architecture_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."backend_architecture_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_balance_snapshot" ADD CONSTRAINT "backend_architecture_balance_snapshot_bank_account_id_backend_architecture_bank_account_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."backend_architecture_bank_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_bank_account" ADD CONSTRAINT "backend_architecture_bank_account_user_id_backend_architecture_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."backend_architecture_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_expense" ADD CONSTRAINT "backend_architecture_expense_bank_account_id_backend_architecture_bank_account_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."backend_architecture_bank_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_expense" ADD CONSTRAINT "backend_architecture_expense_user_id_backend_architecture_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."backend_architecture_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_income" ADD CONSTRAINT "backend_architecture_income_bank_account_id_backend_architecture_bank_account_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."backend_architecture_bank_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_income" ADD CONSTRAINT "backend_architecture_income_user_id_backend_architecture_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."backend_architecture_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "backend_architecture_session" ADD CONSTRAINT "backend_architecture_session_user_id_backend_architecture_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."backend_architecture_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "backend_architecture_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "action_user_id_idx" ON "backend_architecture_action" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "action_previous_action_id_idx" ON "backend_architecture_action" USING btree ("previous_action_id");--> statement-breakpoint
CREATE INDEX "action_entity_id_idx" ON "backend_architecture_action" USING btree ("entity_id","entity_type");--> statement-breakpoint
CREATE INDEX "action_method_name_idx" ON "backend_architecture_action" USING btree ("method_name");--> statement-breakpoint
CREATE INDEX "bank_account_balance_snapshot_bank_account_id_idx" ON "backend_architecture_balance_snapshot" USING btree ("bank_account_id");--> statement-breakpoint
CREATE INDEX "bank_account_user_id_idx" ON "backend_architecture_bank_account" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "bank_account_iban_idx" ON "backend_architecture_bank_account" USING btree ("iban");--> statement-breakpoint
CREATE INDEX "expense_bank_account_id_idx" ON "backend_architecture_expense" USING btree ("bank_account_id");--> statement-breakpoint
CREATE INDEX "expense_user_id_idx" ON "backend_architecture_expense" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "income_bank_account_id_idx" ON "backend_architecture_income" USING btree ("bank_account_id");--> statement-breakpoint
CREATE INDEX "income_user_id_idx" ON "backend_architecture_income" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "backend_architecture_session" USING btree ("user_id");