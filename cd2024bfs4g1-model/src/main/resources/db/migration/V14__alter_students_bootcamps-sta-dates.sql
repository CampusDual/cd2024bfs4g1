ALTER TABLE public.student_bootcamp
ADD COLUMN status VARCHAR(30),
ADD COLUMN start_date TIMESTAMPTZ,
ADD COLUMN end_date TIMESTAMPTZ;