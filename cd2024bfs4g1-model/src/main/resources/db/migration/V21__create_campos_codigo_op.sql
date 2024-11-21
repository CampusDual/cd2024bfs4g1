
ALTER TABLE bootcamps
ADD COLUMN codigo VARCHAR(250),
ADD COLUMN op VARCHAR(250);



DROP VIEW IF EXISTS public.bootcamp_status;

CREATE OR REPLACE VIEW public.bootcamp_status
AS SELECT bootcamps.id,
    bootcamps.name,
    bootcamps.start_date,
    bootcamps.end_date,
    bootcamps.description,
    bootcamps.notes,
    bootcamps.codigo,
    bootcamps.op,
        CASE
            WHEN CURRENT_DATE > bootcamps.end_date THEN 'Finished'::text
            WHEN CURRENT_DATE < bootcamps.start_date THEN 'Pending'::text
            ELSE 'Started'::text
        END AS status
   FROM bootcamps;