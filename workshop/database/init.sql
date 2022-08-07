BEGIN;

DROP TABLE IF EXISTS users, details CASCADE;

CREATE TABLE users (
    email TEXT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE details (
    email TEXT REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE ,
    name TEXT,
    age INTEGER,
    length INTEGER,
    weight INTEGER
);

INSERT INTO users (email, password) VALUES
('hello@gmail.com', 'helloworld1');

INSERT INTO details (email, name, age, length, weight) VALUES
('hello@gmail.com', 'hello', 25, 170, 50);

COMMIT;