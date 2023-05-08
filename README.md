# Proyecto final SPA - Studyverse
### Desarrollador: *Andrés León*

---

### Introducción

[…] en el archivo ```.templates.env``` encontrarán las propiedades utilizadas como variables de entorno.

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

---

### Base de datos

He optado por trabajar con **PostgreSQL**, ya que en el proyecto es necesario relacionar datos de distintas tablas. Por ejemplo: relacionar la tabla de reservas con la tabla de usuarios y, estas a su vez, con la tabla de salas de estudio.

En la fase inicial, haciendo uso de la herramienta **pgAdmin 4**, realicé las pruebas correspondientes en local. Una vez completada esta etapa, llevé a cabo el despliegue de la base de datos en  **ElephantSQL**, un servicio de hosting especializado en PostgreSQL.

---

### Endpoints

La documentación de los endpoints fue generada en la plataforma **Postman**, la cual también utilicé para realizar las pruebas de estos mismos.

A continuación, los enlaces de las distintas APIs del proyecto:

#### [Users](https://documenter.getpostman.com/view/26092515/2s93eU1Z77)

#### [Rooms](https://documenter.getpostman.com/view/26092515/2s93eU1Z78)

#### [Reservations](https://documenter.getpostman.com/view/26092515/2s93eU1Z79)

#### [Auth](https://documenter.getpostman.com/view/26092515/2s93eU1Z7B)

---

### Documentación

*(desplegar en GitPages)*