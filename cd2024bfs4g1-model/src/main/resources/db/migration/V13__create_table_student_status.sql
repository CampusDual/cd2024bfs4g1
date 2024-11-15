alter table public.students
add column student_status_id int not null default 1 ;

CREATE TABLE student_status (
    ID SERIAL PRIMARY KEY,
    status VARCHAR(40) NULL
);


INSERT INTO student_status (status)
VALUES
    ('en revision'),
    ('activo'),
    ('abandono');

ALTER TABLE public.students
ADD CONSTRAINT fk_student_status FOREIGN KEY (student_status_id)
REFERENCES public.student_status(ID);

ALTER TABLE public.students
ALTER COLUMN student_status_id DROP DEFAULT;

ALTER TABLE public.students
DROP COLUMN status;
