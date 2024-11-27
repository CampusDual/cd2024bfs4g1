--TABLA ALUMNO
ALTER TABLE public.students ALTER COLUMN dni DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN employment_status_id DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN student_status_id DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN spain_comunity DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN birth_date DROP NOT NULL;

--TABLA USER
ALTER TABLE public.usr_user ALTER COLUMN usr_login DROP NOT NULL;
ALTER TABLE public.usr_user ALTER COLUMN usr_password DROP NOT NULL;
