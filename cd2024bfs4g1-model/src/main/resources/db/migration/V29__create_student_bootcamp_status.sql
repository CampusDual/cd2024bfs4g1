  CREATE TABLE student_bootcamp_status (
    id SERIAL PRIMARY KEY, -- Identificador único, generado automáticamente
    student_bootcamp_status VARCHAR(255) NOT null, -- El estado del alumno en formato string
    Computable boolean default false
);