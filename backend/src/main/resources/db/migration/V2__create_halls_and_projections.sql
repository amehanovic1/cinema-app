CREATE TABLE "cinema_halls"
(
    "id"         uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "name"       varchar     NOT NULL,
    "venue_id"   uuid        NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz          DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_cinema_hall_venue" FOREIGN KEY ("venue_id")
        REFERENCES "venues" ("id") ON DELETE CASCADE
);

CREATE TABLE "movie_projections"
(
    "id"              uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "movie_id"        uuid        NOT NULL,
    "cinema_hall_id"  uuid        NOT NULL,
    "projection_date" date        NOT NULL,
    "projection_time" time        NOT NULL,
    "created_at"      timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"      timestamptz          DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_movie_projection_movie" FOREIGN KEY ("movie_id")
        REFERENCES "movies" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_movie_projection_hall" FOREIGN KEY ("cinema_hall_id")
        REFERENCES "cinema_halls" ("id") ON DELETE CASCADE
);