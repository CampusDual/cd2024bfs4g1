DROP TABLE student;

CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	name varchar(255) NOT NULL,
	surnames varchar(255) NOT NULL,
	email varchar(255) NOT NULL
);

CREATE TABLE student_bootcamp (
	id SERIAL PRIMARY KEY,
	student_id int4 NULL,
	bootcamp_id int4 NULL,
	CONSTRAINT sb_student_id_bootcamp_id_key UNIQUE (student_id, bootcamp_id),
	CONSTRAINT sb_bootcamp_id_fkey FOREIGN KEY (bootcamp_id) REFERENCES public.bootcamps(id),
	CONSTRAINT sb_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id)
);
