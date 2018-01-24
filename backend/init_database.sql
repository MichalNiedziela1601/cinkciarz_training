CREATE TABLE IF NOT EXISTS wallet (id SERIAL PRIMARY KEY, pln DOUBLE PRECISION,
        eur DOUBLE PRECISION,gbp DOUBLE PRECISION,usd DOUBLE PRECISION, person_id bigint );

CREATE TABLE IF NOT EXISTS logs (id SERIAL PRIMARY KEY, message TEXT NOT NULL, data timestamp with time zone NOT NULL DEFAULT now(), person_id bigint);

CREATE TABLE IF NOT EXISTS person (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, name TEXT);

ALTER TABLE wallet
ADD CONSTRAINT wallet_person FOREIGN KEY (person_id) REFERENCES person (id);

ALTER TABLE logs
ADD CONSTRAINT logs_person FOREIGN KEY (person_id) REFERENCES person (id);


