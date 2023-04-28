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

-- Crear tabla: roles --
CREATE TABLE roles (
    role_id serial PRIMARY KEY,
    role varchar(20) NOT NULL
);

-- Crear tabla: users --
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    role_id int,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    avatar varchar(255) NOT NULL,
    register_date date DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_roles
        FOREIGN KEY (role_id)
            REFERENCES roles(role_id)
);

-- Crear tabla: rooms --
CREATE TABLE rooms (
    room_id serial PRIMARY KEY,
    user_id int,
    role_id int,
    room varchar(255) NOT NULL,
    description varchar(2000) NOT NULL,
    photo varchar(255) NOT NULL,
    creation_date date DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_users
        FOREIGN KEY (user_id)
            REFERENCES users(user_id),
    CONSTRAINT FK_roles
        FOREIGN KEY (role_id)
            REFERENCES roles(role_id)
);

-- Crear roles en tabla roles
INSERT INTO roles(role)
VALUES
('admin'),
('user');

-- Crear usuario con role 'admin' --
INSERT INTO users(first_name, last_name, email, password, avatar, role_id)
VALUES
('Andrés', 'León', 'andres@correo.com','123456', 'url_avatar', 1);

-- Crear usuarios con role 'user' --
INSERT INTO users(first_name, last_name, email, password, avatar, role_id)
VALUES
('Dorian', 'Kelly', 'dorian@correo.com','123456', 'url_avatar', 2),
('Marcos', 'Delgado', 'marcos@correo.com','123456', 'url_avatar', 2),
('Esther', 'Roncalla', 'esther@correo.com','123456', 'url_avatar', 2),
('Kevin', 'Escobar', 'kevin@correo.com','123456', 'url_avatar', 2),
('Jorge', 'Juan', 'jorge@correo.com','123456', 'url_avatar', 2);

-- Crear salas de estudio con role 'admin' --
INSERT INTO rooms(user_id, role_id, room, description, photo)
VALUES
(1, 1, 'Sala de estudio 1', 'Descripción de la sala de estudio 1', 'url_prueba'),
(1, 1, 'Sala de estudio 2', 'Descripción de la sala de estudio 2', 'url_prueba');