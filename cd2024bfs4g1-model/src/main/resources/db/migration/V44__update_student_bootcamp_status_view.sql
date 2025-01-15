ALTER TABLE student_bootcamp ADD COLUMN "status_id" int4;

CREATE OR REPLACE VIEW public.bootcamp_status
AS SELECT b.id,
    b.name,
    b.start_date,
    b.end_date,
    b.description,
    b.notes,
    b.codigo,
    b.op,
        CASE
            WHEN CURRENT_DATE > b.end_date THEN 'Finished'::text
            WHEN CURRENT_DATE < b.start_date THEN 'Pending'::text
            ELSE 'Started'::text
        END AS status,
    concat(count(
        CASE
            WHEN sbs.computable THEN sb.id
            ELSE NULL::integer
        END), '/', count(sb.id)) AS students_summary
   FROM bootcamps b
     LEFT JOIN student_bootcamp sb ON b.id = sb.bootcamp_id
     LEFT JOIN student_bootcamp_status sbs ON sb.status_id = sbs.id
  GROUP BY b.id, b.name, b.start_date, b.end_date, b.description, b.notes, b.codigo, b.op
  ORDER BY (b.name COLLATE "es-ES-x-icu");