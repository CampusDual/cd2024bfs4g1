CREATE TABLE public.tutor_bootcamp_bckp AS SELECT * FROM public.tutor_bootcamp;

TRUNCATE TABLE public.tutor_bootcamp;

DELETE FROM public.tutors_type WHERE id IN (1,2);

INSERT INTO public.tutors_type (id, "type") VALUES(1, 'Titular');
INSERT INTO public.tutors_type (id, "type") VALUES(2, 'Apoyo');

INSERT INTO public.tutor_bootcamp SELECT * FROM tutor_bootcamp_bckp;

DROP TABLE public.tutor_bootcamp_bckp;