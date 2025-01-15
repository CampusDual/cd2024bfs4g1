
DELETE FROM public.tutors_type WHERE id IN (1,2);

INSERT INTO public.tutors_type (id, "type") VALUES(1, 'Titular');
INSERT INTO public.tutors_type (id, "type") VALUES(2, 'Apoyo');

UPDATE tutor_bootcamp tb SET tutor_type=2 WHERE NOT EXISTS (SELECT 1 FROM tutors_type tt WHERE tb.tutor_type=tt.id);

ALTER TABLE tutor_bootcamp
    ADD CONSTRAINT fk_tutor_type_bootcamp FOREIGN KEY (tutor_type) REFERENCES tutors_type(id);