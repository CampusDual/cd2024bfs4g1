ALTER TABLE public.students
  ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'NOT_ELIGIBLE',
  ADD COLUMN province VARCHAR(30) NOT NULL DEFAULT 'Madrid',
  ADD COLUMN location VARCHAR(30);

ALTER TABLE public.students
    ALTER COLUMN province DROP DEFAULT;
ALTER TABLE public.students
    ALTER COLUMN  status DROP DEFAULT;