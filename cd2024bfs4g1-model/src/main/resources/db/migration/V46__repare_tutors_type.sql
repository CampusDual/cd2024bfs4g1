
DELETE FROM public.tutors_type WHERE id IN (1,2);

INSERT INTO public.tutors_type (id, "type") VALUES(1, 'Titular');
INSERT INTO public.tutors_type (id, "type") VALUES(2, 'Apoyo');

ALTER TABLE tutor_bootcamp
    ADD CONSTRAINT fk_tutor_type_bootcamp FOREIGN KEY (tutor_type) REFERENCES tutors_type(id);