# NODUS SCIENTIA

# Índice 🗂️

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

## Descripción del proyecto 📖

Este proyecto tiene como objetivo proporcionar una plataforma para gestionar bootcamps, tutores y alumnos en IMATIA. La aplicación permite a los gestores administrar bootcamps, asignar tutores y alumnos, 
y realizar un seguimiento detallado de las interacciones dentro del sistema. La plataforma está construida utilizando **Angular** para el frontend,  **Node.js** para el backend, y **PostgreSQL** como base de datos, 
ofreciendo una experiencia eficiente y fácil de usar tanto para los usuarios como para los administradores.

---

## Estado del proyecto

:construction: Proyecto en construcción :construction:
Proyecto de libre uso. 
Las actualizaciones y mejoras son agradecidas!!
---

## Funcionalidades del Proyecto ⚙️

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

### DESPLIEGUE LOCAL  🧰

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

## Tecnologías Usadas 🚀

A continuación se describen las principales tecnologías utilizadas en este proyecto:

### Backend
- ![Java 11](https://img.shields.io/badge/Java%2011-%23ED8B00.svg?style=flat&logo=java&logoColor=white) [Java 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html): Lenguaje de programación utilizado para el desarrollo del backend, que garantiza rendimiento y robustez.
- ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=flat&logo=springboot&logoColor=white) [Spring Boot](https://spring.io/projects/spring-boot): Framework basado en Java que facilita la creación de aplicaciones backend con configuración mínima y soporte para servicios REST.
- ![JPA](https://img.shields.io/badge/JPA-%23007396.svg?style=flat&logo=java&logoColor=white) [JPA (Java Persistence API)](https://jakarta.ee/specifications/persistence/): Utilizado para la gestión de la persistencia de datos, facilitando la interacción con la base de datos.
- ![Maven](https://img.shields.io/badge/Maven-%23C71A36.svg?style=flat&logo=apachemaven&logoColor=white) [Maven](https://maven.apache.org/): Herramienta de gestión de dependencias y construcción de proyectos Java.

### Frontend
- ![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=flat&logo=angular&logoColor=white) [Angular](https://angular.io/): Framework para el desarrollo del frontend, que permite construir aplicaciones web de una sola página (SPA) con un alto nivel de interacción.
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white) [TypeScript](https://www.typescriptlang.org/): Superset de JavaScript que añade tipado estático, utilizado en la construcción del frontend.
- ![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white) [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML): Lenguaje de marcado estándar para la estructura de la interfaz.
- ![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat&logo=css3&logoColor=white) [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS): Hojas de estilo para el diseño y la presentación.
- ![SCSS](https://img.shields.io/badge/SCSS-%23CC6699.svg?style=flat&logo=sass&logoColor=white) [SCSS](https://sass-lang.com/): Preprocesador de CSS que permite escribir hojas de estilo de forma modular y avanzada.
- ![NgRx](https://img.shields.io/badge/NgRx-%23BA2BD2.svg?style=flat&logo=reactivex&logoColor=white) [NgRx](https://ngrx.io/): Librería para la gestión del estado de la aplicación en Angular, basada en un patrón de flujo unidireccional de datos.

### Base de Datos
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23336791.svg?style=flat&logo=postgresql&logoColor=white) [PostgreSQL](https://www.postgresql.org/): Sistema de gestión de bases de datos relacional utilizado para almacenar la información de los usuarios, tutores, y otros datos relevantes.

### Herramientas de Desarrollo
- ![VS Code](https://img.shields.io/badge/VS%20Code-%23007ACC.svg?style=flat&logo=visualstudiocode&logoColor=white) [Visual Studio Code](https://code.visualstudio.com/): Editor de código fuente utilizado para el desarrollo frontend.
- ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-%23000000.svg?style=flat&logo=intellijidea&logoColor=white) [IntelliJ IDEA](https://www.jetbrains.com/idea/): IDE utilizado para el desarrollo backend en Java.
- ![Git](https://img.shields.io/badge/Git-%23F05033.svg?style=flat&logo=git&logoColor=white) [Git](https://git-scm.com/): Sistema de control de versiones utilizado para gestionar el código fuente del proyecto.

### Otros
- ![Ontimize](https://img.shields.io/badge/Ontimize-%231A1A1A.svg?style=flat&logo=java&logoColor=white) [Ontimize](https://ontimize.com/): Framework para la creación de aplicaciones empresariales, utilizado para el desarrollo rápido del backend y la interfaz de usuario.
- ![JUnit](https://img.shields.io/badge/JUnit-%23A020F0.svg?style=flat&logo=java&logoColor=white) [JUnit](https://junit.org/junit5/): Framework para pruebas unitarias en Java, utilizado para garantizar la calidad del código.


---

## Autores 👥

Este proyecto ha sido desarrollado como parte del **Bootcamp de Desarrollo Fullstack IMATIA SEPT 2024 / FEB 2025**.  

📌 **Equipo de Desarrollo**:  
> 🚀 Estudiantes del Bootcamp de Desarrollo Fullstack IMATIA  

| Nombre | Apellido 1 | Apellido 2 |
|--------|-----------|------------|
| Brayan  | Iglesias  | Pereira    |
| Daniel  | Rey       | Pérez      |
| David   | Carrera   | Otero      |
| David   | Domínguez | Vidal      |
| David   | Velasco   | Pérez      |
| Francisco | Rego   | Prieto     |
| Gabriel  | Freire   | Simón      |
| Gabriel  | Alonso   | Varela     |
| Javier   | Pérez    | Otero      |
| Jesús    | Blanco   | Míguez     |
| Joel     | Álvarez  | Rodríguez  |
| José Manuel | Riveiro | López del Castillo |
| Manuel   | Fernández | Crego     |
| Marcos Adrián | Padín | Abal     |
| María Jesús | Muñoz  | Heredia   |
| Mario    | Martínez | Vilariño   |
| Nicolás Iván | Vázquez | Pintos  |
| Olga     | Gil      | Peñas      |
| Ruan Nicolás | De Proença | Gimenes |
| Sara     | Rey      | Valiño     |

📅 **Año**: 2024/2025  
