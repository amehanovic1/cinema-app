CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE "image_type" AS ENUM (
    'poster',
    'backdrop'
);

CREATE TABLE "countries" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar UNIQUE NOT NULL,
    "iso_2_code" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "cities" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar NOT NULL,
    "timezone" varchar NOT NULL,
    "country_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_city_country" FOREIGN KEY ("country_id")
        REFERENCES "countries" ("id") ON DELETE RESTRICT
);

CREATE TABLE "venues" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar NOT NULL,
    "street" varchar NOT NULL,
    "street_number" varchar NOT NULL,
    "phone" varchar NOT NULL,
    "image_url" varchar NOT NULL,
    "city_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT "fk_venue_city" FOREIGN KEY ("city_id")
        REFERENCES "cities" ("id") ON DELETE RESTRICT
);

CREATE TABLE "movies" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" varchar NOT NULL,
    "language" varchar NOT NULL,
    "projection_start_date" date NOT NULL,
    "projection_end_date" date NOT NULL,
    "director_full_name" varchar NOT NULL,
    "synopsis" text NOT NULL,
    "pg_rating" varchar NOT NULL,
    "duration_in_minutes" integer NOT NULL,
    "trailer_url" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "movie_images" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "url" varchar NOT NULL,
    "type" image_type NOT NULL,
    "movie_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT "fk_movie_image_movie" FOREIGN KEY ("movie_id")
        REFERENCES "movies" ("id") ON DELETE CASCADE
);

CREATE TABLE "genres" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "movie_genres" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "movie_id" uuid NOT NULL,
    "genre_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_movie_genre_movie" FOREIGN KEY ("movie_id")
        REFERENCES "movies" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_movie_genre_genre" FOREIGN KEY ("genre_id")
        REFERENCES "genres" ("id") ON DELETE CASCADE
);

CREATE TABLE "seat_types" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar NOT NULL,
    "price" decimal(10,2) NOT NULL,
    "description" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP
);


