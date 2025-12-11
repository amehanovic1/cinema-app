CREATE TABLE "refresh_tokens"
(
    "id"         uuid PRIMARY KEY,
    "user_id"    uuid        NOT NULL,
    "token_hash" varchar     NOT NULL,
    "expires_at" timestamptz NOT NULL,
    "is_revoked" boolean     NOT NULL DEFAULT FALSE,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_refresh_token_user" FOREIGN KEY ("user_id")
        REFERENCES "users" ("id") ON DELETE CASCADE
);