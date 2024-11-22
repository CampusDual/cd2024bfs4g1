
CREATE TABLE public.tutors_type (
	id serial4 NOT NULL,
	"type" varchar(50) NOT NULL,
	CONSTRAINT tutors_type_pkey PRIMARY KEY (id)
);

ALTER TABLE public.tutor_bootcamp ADD tutor_type int4 DEFAULT 1 NOT NULL;