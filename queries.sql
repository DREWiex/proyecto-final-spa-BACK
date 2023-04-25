-- Crear base de datos --
CREATE DATABASE studyverse
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Crear tabla: users --
CREATE TABLE users (
    user_id serial PRIMARY KEY, 
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    avatar varchar(255) NOT NULL,
    register_date date DEFAULT CURRENT_TIMESTAMP,
);

-- Crear tabla: rols --
CREATE TABLE rols (
    rol_id serial PRIMARY KEY,
    rol varchar(45) DEFAULT 'user',
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Crear usuarios --
INSERT INTO users(first_name, last_name, email, password, avatar)
VALUES
('Dorian', 'Kelly', 'dorian@correo.com','123456', 'url_avatar'),
('Marcos', 'Delgado', 'marcos@correo.com','123456', 'url_avatar'),
('Esther', 'Roncalla', 'esther@correo.com','123456', 'url_avatar'),
('Kevin', 'Escobar', 'kevin@correo.com','123456', 'url_avatar'),
('Jorge', 'Juan', 'jorge@correo.com','123456', 'url_avatar');