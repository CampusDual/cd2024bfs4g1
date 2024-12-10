TRUNCATE TABLE public.tutor_bootcamp;

DELETE FROM tutors_type WHERE id IN (1,2);

INSERT INTO public.tutors_type (id, "type") VALUES(1, 'Titular');
INSERT INTO public.tutors_type (id, "type") VALUES(2, 'Apoyo');