# NODUS SCIENTIA

# Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Estado del Proyecto](#estado-del-proyecto)
3. [Funcionalidades del Proyecto](#funcionalidades-del-proyecto)
   - [Gestión de Bootcamps](#gestión-de-bootcamps)
   - [Gestión de Tutores](#gestión-de-tutores)
   - [Gestión de Alumnos](#gestión-de-alumnos)
   - [Seguridad y Privacidad](#seguridad-y-privacidad)
   - [Interfaz Intuitiva](#interfaz-intuitiva)
4. [Despliegue Local](#despliegue-local)
5. [Información Adicional](#información-adicional)
   - [Usuarios Predeterminados de la Aplicación](#usuarios-predeterminados-de-la-aplicación)
   - [Ontimize Boot](#ontimize-boot)
6. [Tecnologías Usadas](#tecnologías-usadas)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Base de Datos](#base-de-datos)
   - [Herramientas de Desarrollo](#herramientas-de-desarrollo)
   - [Otros](#otros)

---

## Descripción del proyecto

Este proyecto tiene como objetivo proporcionar una plataforma para gestionar bootcamps, tutores y alumnos en IMATIA. La aplicación permite a los gestores administrar bootcamps, asignar tutores y alumnos, 
y realizar un seguimiento detallado de las interacciones dentro del sistema. La plataforma está construida utilizando **Angular** para el frontend,  **Node.js** para el backend, y **PostgreSQL** como base de datos, 
ofreciendo una experiencia eficiente y fácil de usar tanto para los usuarios como para los administradores.

---

## Estado del proyecto

:construction: Proyecto en construcción :construction:

---

## Funcionalidades del Proyecto

### 1. **Gestión de Bootcamps**
   - **Crear, Editar y Eliminar Bootcamps**: Los gestores pueden gestionar todos los aspectos de los bootcamps, incluyendo la creación de nuevos programas, edición de los existentes y eliminación de aquellos que ya no son necesarios.
   - **Asignación de Tutores y Alumnos**: Los gestores pueden asignar tutores y alumnos a cada bootcamp, facilitando la organización de los grupos.

### 2. **Gestión de Tutores**
   - **Acceso a la Información de Bootcamps y Alumnos**: Los tutores tienen acceso a los bootcamps a los que están asignados y pueden ver los detalles de los alumnos bajo su supervisión.
   - **Subida de Materiales Educativos**: Los tutores pueden cargar y gestionar materiales como cronogramas, evaluaciones y otros recursos de estudio relevantes para sus alumnos.

### 3. **Gestión de Alumnos**
   - **Acceso a Materiales de Estudio**: Los alumnos pueden acceder de manera organizada a los materiales proporcionados por los tutores, como documentos, enlaces y otros recursos.
   - **Visualización de Fechas Importantes**: Los alumnos tienen un calendario o sección de notificaciones donde pueden ver las fechas clave del bootcamp, como exámenes y entregas de trabajos.
   - **Recibir Anuncios y Actualizaciones**: Los alumnos pueden recibir anuncios importantes y actualizaciones sobre los bootcamps directamente en su perfil.

### 4. **Seguridad y Privacidad**
   - **Control de Acceso Personalizado**: El sistema garantiza que cada usuario solo pueda acceder a las funciones y datos que le correspondan según su rol (gestor, tutor o alumno).
   - **Protección de Datos**: El uso de tecnologías como **Node.js** y **PostgreSQL** asegura que los datos estén protegidos de accesos no autorizados.

### 5. **Interfaz Intuitiva**
   - **Diseño Adaptado a Cada Usuario**: La aplicación proporciona una interfaz optimizada para cada tipo de usuario, con acceso rápido y sencillo a las funcionalidades que necesita.
   - **Experiencia de Usuario Mejorada**: La interfaz es fluida y accesible, garantizando que la interacción con la aplicación sea fácil y eficiente.

---

### DESPLIEGUE LOCAL

Los parámetros en el archivo `application-local.yaml` deben coincidir con los valores de los servicios de desarrollo, como la base de datos. Por defecto, los parámetros coinciden con los valores en los archivos de Docker.

- Ve a la carpeta de la aplicación:

    cd cd2024bfs4g1

- Si no hay un despliegue de los servicios de desarrollo disponible, ejecuta el archivo Docker Compose proporcionado para iniciar los servicios:

    docker compose -f docker-compose-services.yaml up

- Compila y despliega la aplicación con los siguientes comandos:

    mvn clean install -Plocal
    java -jar cd2024bfs4g1-boot/target/cd2024bfs4g1-boot.jar --spring.profiles.active=local

- La aplicación es accesible usando la URL: [http://localhost:8080](http://localhost:8080)

## INFORMACIÓN ADICIONAL

### Usuarios predeterminados de la aplicación

Por defecto, la aplicación proporciona dos usuarios. Adáptalos según sea necesario:

- **Admin**:
    - Rol: `Administrador`
    - Usuario: `admin`
    - Contraseña: `adminuser`

- **Demo**:
    - Rol: `Usuario`
    - Usuario: `demo`
    - Contraseña: `demouser`

### Ontimize Boot

- Ve a la carpeta de la aplicación y ejecuta la instalación:

    mvn clean install -Plocal

#### Iniciar solo el servidor:

- Ve a la carpeta `cd2024bfs4g1-boot` y ejecuta el comando:

    mvn spring-boot:run -Dspring-boot.run.profiles=local

#### Ejecutar el cliente solo, fuera del servidor Spring Boot:

- Ve a la carpeta `frontend/src/main/ngx`, si tienes `node` y `npm` instalados en tu sistema, ejecuta los siguientes comandos:

    npm install
    npm run start-local

Usa la siguiente URL para acceder a la aplicación: [http://localhost:4299](http://localhost:4299)

#### Desplegar y ejecutar el cliente y el servidor juntos:

- Ve a la carpeta `cd2024bfs4g1-boot/target` y ejecuta el comando:

    java -jar cd2024bfs4g1-boot/target/cd2024bfs4g1-boot.jar --spring.profiles.active=local

Usa la siguiente URL para acceder a la aplicación: [http://localhost:8080](http://localhost:8080)

---

## Tecnologías Usadas

A continuación se describen las principales tecnologías utilizadas en este proyecto:

### Backend

- **Java 11**: Lenguaje de programación utilizado para el desarrollo del backend, que garantiza rendimiento y robustez.
- **Spring Boot**: Framework basado en Java que facilita la creación de aplicaciones backend con configuración mínima y soporte para servicios REST.
- **JPA (Java Persistence API)**: Utilizado para la gestión de la persistencia de datos, facilitando la interacción con la base de datos.
- **Maven**: Herramienta de gestión de dependencias y construcción de proyectos Java.
  
### Frontend

- **Angular**: Framework para el desarrollo del frontend, que permite construir aplicaciones web de una sola página (SPA) con un alto nivel de interacción.
- **TypeScript**: Superset de JavaScript que añade tipado estático, utilizado en la construcción del frontend.
- **HTML5 y CSS3**: Tecnologías estándar para la creación de la estructura y el diseño de la interfaz de usuario.
- **SCSS**: Preprocesador de CSS que permite escribir hojas de estilo de forma más modular y con características avanzadas.
- **NgRx**: Librería para la gestión del estado de la aplicación en Angular, basada en un patrón de flujo unidireccional de datos.

### Base de Datos

- **PostgreSQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar la información de los usuarios, tutores, y otros datos relevantes.
  
### Herramientas de Desarrollo

- **Visual Studio Code**: Editor de código fuente utilizado para el desarrollo frontend.
- **IntelliJ IDEA**: IDE utilizado para el desarrollo backend en Java.
- **Git**: Sistema de control de versiones utilizado para gestionar el código fuente del proyecto.

### Otros

- **Ontimize**: Framework para la creación de aplicaciones empresariales, utilizado para el desarrollo rápido del backend y la interfaz de usuario.
- **JUnit**: Framework para pruebas unitarias en Java, utilizado para garantizar la calidad del código.

---

## Autores

Este proyecto ha sido desarrollado como parte del **Bootcamp de Desarrollo Fullstack IMATIA SEPT 2024 / FEB 2025**.

- **Equipo de Desarrollo**: Estudiantes del Bootcamp de Desarrollo Fullstack IMATIA
- **Año**: 2024/2025
