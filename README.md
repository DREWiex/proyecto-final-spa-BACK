# Proyecto final SPA - Backend
## Studyverse

Desarrollado por: **Andrés León**

---

### Introducción

**Studyverse** es una aplicación que permite reservar salas de estudio a los alumnos que están registrados.

Consta de tres entornos:
- Rutas públicas: login y registro.
- Dashboard del usuario: se accede si el rol del usuario es 'user'. En esta área podrá consultar la información de sus reservas, salas de estudio y formulario de contacto.
- Dashboard del admin: se accede con un único usuario con rol 'admin'. En esta área podrá crear, editar y eliminar usuarios, salas de estudio y reservas.

---

### Inicialización

1. Clonar el repositorio:
```
git clone https://github.com/DREWiex/proyecto-final-spa-BACK.git
```
2. Instalar las dependencias:
```
npm i
```
3. Configurar las variables de entorno creando el archivo ```.env```.
4. Iniciar la aplicación:
```
npm run start
```

---

### Tecnologías

- **Node.js**
- **Express**
- **PostgreSQL**

---

### Base de datos

He optado por trabajar con **PostgreSQL**, ya que en el proyecto es necesario relacionar datos de distintas tablas. Por ejemplo: relacionar la tabla de reservas con la tabla de usuarios y, estas a su vez, con la tabla de salas de estudio.

En la fase inicial, haciendo uso de la herramienta **pgAdmin 4**, realicé las pruebas correspondientes en local. Una vez completada esta etapa, llevé a cabo el despliegue de la base de datos en  **ElephantSQL**, un servicio de hosting especializado en PostgreSQL.

---

### Documentación

La documentación ha sido desplegada en GitHub Pages.

#### [Documentación](https://drewiex.github.io/proyecto-final-spa-BACK/)

---

### Endpoints

La documentación de los endpoints fue generada en la plataforma **Postman**, la cual también utilicé para realizar las pruebas de estos mismos.

A continuación, los enlaces de las distintas APIs del proyecto:

#### [Users](https://documenter.getpostman.com/view/26092515/2s93eU1Z77)

#### [Rooms](https://documenter.getpostman.com/view/26092515/2s93eU1Z78)

#### [Reservations](https://documenter.getpostman.com/view/26092515/2s93eU1Z79)

#### [Auth](https://documenter.getpostman.com/view/26092515/2s93eU1Z7B)

---

### Despliegue

Despliegue hecho en Render: https://proyecto-final-spa-back.onrender.com

---

### Próxima versión

- Recuperar/cambiar contraseña.

- Implementación del calendario utilizando las librerías react-big-calendar y Datepicker.

- Gestión de las salas de estudio y de las reservas desde el dashboard del admin (CRUD).

- Crear dos nuevas tablas en PostgreSQL:

    - Status: para manejar el estado de la reserva:

        - Reservada.
        - Pendiente.
        - Anulada.

    - Password: para gestionar la recuperación de contraseña del usuario. En ella se relacionará el usuario con el token que se genere temporalmente al enviarse el e-mail para la recuperación (EmailJS).
