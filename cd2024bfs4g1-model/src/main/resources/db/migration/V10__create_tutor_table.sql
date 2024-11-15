CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname1 VARCHAR(255) NOT NULL,
    surname2 VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE tutor_bootcamp (
	id SERIAL PRIMARY KEY,
	tutor_id int4 NULL,
	bootcamp_id int4 NULL,
	CONSTRAINT sb_tutor_id_bootcamp_id_key UNIQUE (tutor_id, bootcamp_id),
	CONSTRAINT sb_bootcamp_id_fkey FOREIGN KEY (bootcamp_id) REFERENCES public.bootcamps(id),
	CONSTRAINT sb_tutor_id_fkey FOREIGN KEY (tutor_id) REFERENCES public.tutors(id)
);

UPDATE students SET tutor = null where 1=1;

ALTER TABLE students ALTER COLUMN tutor TYPE INT USING tutor::INTEGER;