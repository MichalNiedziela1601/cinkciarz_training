CREATE TABLE IF NOT EXISTS wallet (id SERIAL PRIMARY KEY, "PLN" DOUBLE PRECISION,
        "EUR" DOUBLE PRECISION,"GBP" DOUBLE PRECISION,"USD" DOUBLE PRECISION );

CREATE TABLE IF NOT EXISTS logs (id SERIAL PRIMARY KEY, message TEXT NOT NULL, data timestamp NOT NULL DEFAULT now());

CREATE TABLE IF NOT EXISTS person (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, name TEXT);