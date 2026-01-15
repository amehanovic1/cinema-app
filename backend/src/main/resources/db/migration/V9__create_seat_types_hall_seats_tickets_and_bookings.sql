CREATE TYPE "seat_category" AS ENUM (
    'regular',
    'vip',
    'love'
);

CREATE TABLE "seat_types"
(
    "id"          uuid PRIMARY KEY       DEFAULT gen_random_uuid(),
    "category"    seat_category NOT NULL,
    "price"       decimal       NOT NULL,
    "description" varchar       NOT NULL,
    "created_at"  timestamptz   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  timestamptz            DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "hall_seats"
(
    "id"             uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "seat_type_id"   uuid        NOT NULL,
    "cinema_hall_id" uuid        NOT NULL,
    "seat_code"      varchar     NOT NULL,
    "created_at"     timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"     timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_hall_seat_type" FOREIGN KEY ("seat_type_id")
        REFERENCES "seat_types" ("id") ON DELETE RESTRICT,
    CONSTRAINT "fk_hall_seat_hall" FOREIGN KEY ("cinema_hall_id")
        REFERENCES "cinema_halls" ("id") ON DELETE CASCADE
);

CREATE TABLE "bookings"
(
    "id"           uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "user_id"      uuid        NOT NULL,
    "ticket_count" integer     NOT NULL,
    "status"       varchar     NOT NULL,
    "created_at"   timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at"   timestamptz,
    "updated_at"   timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_booking_user" FOREIGN KEY ("user_id")
        REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE TABLE "tickets"
(
    "id"            uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "projection_id" uuid        NOT NULL,
    "hall_seat_id"  uuid        NOT NULL,
    "booking_id"    uuid        NOT NULL,
    "created_at"    timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    timestamptz          DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_ticket_projection" FOREIGN KEY ("projection_id")
        REFERENCES "movie_projections" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_ticket_hall_seat" FOREIGN KEY ("hall_seat_id")
        REFERENCES "hall_seats" ("id") ON DELETE RESTRICT,
    CONSTRAINT "fk_ticket_booking" FOREIGN KEY ("booking_id")
        REFERENCES "bookings" ("id") ON DELETE CASCADE
);

