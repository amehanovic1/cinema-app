ALTER TYPE image_type ADD VALUE 'extra';

CREATE TYPE "movie_role_type" AS ENUM (
    'lead',
    'supporting',
    'cameo'
);

CREATE TYPE "movie_rating_source" AS ENUM (
    'imdb',
    'rotten_tomatoes'
);

CREATE TABLE "movie_cast"
(
    "id"                  uuid PRIMARY KEY         DEFAULT gen_random_uuid(),
    "first_name"          varchar         NOT NULL,
    "last_name"           varchar         NOT NULL,
    "character_full_name" varchar         NOT NULL,
    "role"                movie_role_type NOT NULL,
    "movie_id"            uuid            NOT NULL,
    "created_at"          timestamptz     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"          timestamptz              DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_movie_cast_movie" FOREIGN KEY ("movie_id")
        REFERENCES "movies" ("id") ON DELETE CASCADE
);

CREATE TABLE "movie_writers"
(
    "id"         uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "first_name" varchar     NOT NULL,
    "last_name"  varchar     NOT NULL,
    "movie_id"   uuid        NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_movie_writer_movie" FOREIGN KEY ("movie_id")
        REFERENCES "movies" ("id") ON DELETE CASCADE
);

CREATE TABLE "movie_ratings"
(
    "id"         uuid PRIMARY KEY             DEFAULT gen_random_uuid(),
    "source"     movie_rating_source NOT NULL,
    "value"      decimal             NOT NULL,
    "movie_id"   uuid                NOT NULL,
    "created_at" timestamptz         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz                  DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_movie_rating_movie" FOREIGN KEY ("movie_id")
        REFERENCES "movies" ("id") ON DELETE CASCADE
);
