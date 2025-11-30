CREATE TABLE "users"
(
    "id"                uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "first_name"        varchar     NOT NULL,
    "last_name"         varchar     NOT NULL,
    "email"             varchar     NOT NULL UNIQUE,
    "password"          varchar     NOT NULL,
    "phone"             varchar,
    "profile_image_url" varchar,
    "city_id"           uuid,
    "created_at"        timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"        timestamptz          DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_user_city" FOREIGN KEY ("city_id")
        REFERENCES "cities" ("id") ON DELETE CASCADE
);

CREATE TABLE "roles"
(
    "id"         uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
    "name"       varchar     NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz          DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "user_roles"
(
    "user_id" uuid NOT NULL,
    "role_id" uuid NOT NULL,
    CONSTRAINT "pk_user_roles" PRIMARY KEY ("user_id", "role_id"),
    CONSTRAINT "fk_user_role_user" FOREIGN KEY ("user_id")
        REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_user_role_role" FOREIGN KEY ("role_id")
        REFERENCES "roles" ("id") ON DELETE CASCADE
);