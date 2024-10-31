drop view bootcamp_status;

ALTER TABLE public.bootcamps ALTER COLUMN start_date TYPE timestamptz USING start_date::timestamptz;
ALTER TABLE public.bootcamps ALTER COLUMN end_date TYPE timestamptz USING end_date::timestamptz;

CREATE OR REPLACE VIEW public.bootcamp_status
AS SELECT bootcamps.id,
    bootcamps.name,
    bootcamps.start_date,
    bootcamps.end_date,
    bootcamps.description,
    bootcamps.notes,
        CASE
            WHEN CURRENT_DATE > bootcamps.end_date THEN 'Finished'::text
            WHEN CURRENT_DATE < bootcamps.start_date THEN 'Pending'::text
            ELSE 'Started'::text
        END AS status
   FROM bootcamps;

ALTER TABLE public.students ALTER COLUMN birth_date TYPE timestamptz USING birth_date::timestamptz;
ALTER TABLE public.students ALTER COLUMN fct_start TYPE timestamptz USING fct_start::timestamptz;
ALTER TABLE public.students ALTER COLUMN fct_end TYPE timestamptz USING fct_end::timestamptz;
