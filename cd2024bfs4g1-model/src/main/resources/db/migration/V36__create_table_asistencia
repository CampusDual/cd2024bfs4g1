CREATE TABLE public.attendance_status (
    id serial4 primary key,
    abbreviation varchar(1) NOT NULL,
    description varchar(50) NOT NULL
);

CREATE TABLE public.attendance (
    id serial4 primary key,
    student_id int4 NOT NULL,
    bootcamp_id int4 NOT NULL,
    date date NOT NULL,
    attendance_status_id int4 NOT NULL,
    CONSTRAINT attendance_bootcamp_fk FOREIGN KEY (bootcamp_id) REFERENCES public.bootcamps(id),
    CONSTRAINT attendance_student_fk FOREIGN KEY (student_id) REFERENCES public.students(id),
    CONSTRAINT attendance_status_fk FOREIGN KEY (attendance_status_id) REFERENCES public.attendance_status(id)
);

INSERT INTO public.attendance_status (abbreviation, description)
VALUES
(' ', 'Sin marcar'),
('S', 'Si'),
('N', 'No'),
('J', 'Justificada');