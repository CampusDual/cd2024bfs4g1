CREATE TABLE public.notas (
	id serial4 NOT NULL,
	id_students int4 NOT NULL,
	nota varchar(500) NOT NULL,
	fecha timestamptz NOT NULL,
	CONSTRAINT notas_pk PRIMARY KEY (id),
	CONSTRAINT notas_students_fk FOREIGN KEY (id_students) REFERENCES public.students(id)
);