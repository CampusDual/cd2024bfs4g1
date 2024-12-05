

  CREATE TABLE alumn_bootcamp_status (
    id SERIAL PRIMARY KEY, -- Identificador único, generado automáticamente
    student_bootcamp_status VARCHAR(255) NOT NULL -- El estado del alumno en formato string
);

ALTER TABLE public.student_bootcamp
DROP COLUMN status;