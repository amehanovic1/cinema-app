CREATE TABLE "movie_drafts"
(
    "id"         uuid PRIMARY KEY,
    "user_id"   uuid        NOT NULL,
    "step"       varchar     NOT NULL,
    "data"       jsonb       NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_movie_draft_user" FOREIGN KEY ("user_id")
        REFERENCES "users" ("id") ON DELETE CASCADE
);

ALTER TABLE "movies" ADD COLUMN "archived_at" timestamptz DEFAULT NULL;

ALTER TABLE "movie_cast" ALTER COLUMN "role" TYPE varchar;
DROP TYPE IF EXISTS "movie_role_type";

ALTER TABLE "movie_images" ALTER COLUMN "type" TYPE varchar;
DROP TYPE IF EXISTS "image_type";

ALTER TABLE "movie_ratings" ALTER COLUMN "source" TYPE varchar;
DROP TYPE IF EXISTS "movie_rating_source";