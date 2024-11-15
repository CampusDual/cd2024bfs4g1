CREATE TABLE employment_status (
    ID SERIAL PRIMARY KEY,
    situation VARCHAR(40) NOT NULL
);

INSERT INTO employment_status (situation)
VALUES
    ('estudiante'),
    ('desempleado'),
    ('trabajando');

ALTER TABLE public.students
ADD COLUMN employment_status_id INT NOT NULL DEFAULT 1;

ALTER TABLE public.students
ALTER COLUMN employment_status_id DROP DEFAULT;

ALTER TABLE public.students
DROP COLUMN employment_status;

ALTER TABLE public.students
ADD CONSTRAINT fk_employment_status FOREIGN KEY (employment_status_id)
REFERENCES public.employment_status(ID);