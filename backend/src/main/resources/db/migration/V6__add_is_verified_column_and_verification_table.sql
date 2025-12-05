ALTER TABLE "users" ADD COLUMN "is_verified" BOOLEAN DEFAULT FALSE NOT NULL;

CREATE TABLE "email_verification_codes"
(
    "id"         uuid PRIMARY KEY,
    "user_id"    uuid        NOT NULL,
    "code_hash"  varchar     NOT NULL,
    "expires_at" timestamptz NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_email_code_user" FOREIGN KEY ("user_id")
        REFERENCES "users" ("id") ON DELETE CASCADE
);