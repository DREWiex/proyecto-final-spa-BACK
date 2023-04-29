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

-- Crear tabla de roles --
CREATE TABLE roles (
    role_id serial PRIMARY KEY,
    role varchar(20) NOT NULL
);

-- Crear tabla de usuarios --
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

-- Crear tabla de salas de estudio --
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

-- Crear tabla de reservas --
CREATE TABLE reservations (
    reservation_id serial PRIMARY KEY,
    user_id int,
    room_id int,
    reservation_date date NOT NULL,
    start_time time NOT NULL,
	end_time time NOT NULL,
    creation_date date DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_users
        FOREIGN KEY (user_id)
            REFERENCES users(user_id)
                ON DELETE CASCADE,
    CONSTRAINT FK_rooms
        FOREIGN KEY (room_id)
            REFERENCES rooms(room_id)
                ON DELETE CASCADE
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

-- Crear reservas de salas de estudio --
INSERT INTO reservations(user_id, room_id, reservation_date, start_time, end_time)
VALUES
(2, 1, '2023/07/16', '10:00', '11:00'),
(3, 1, '2023/07/16', '11:30', '13:00'),
(5, 1, '2023/06/28', '09:30', '10:30'),
(4, 2, '2023/06/19', '16:00', '19:00'),
(2, 2, '2023/09/07', '08:00', '09:00'),
(6, 1, '2023/08/10', '12:30', '14:00'),
(5, 1, '2023/11/05', '15:00', '16:30');