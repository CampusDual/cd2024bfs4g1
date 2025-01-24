ALTER TABLE public.students ADD creation_date timestamp with time zone DEFAULT now() NOT NULL;

drop view if exists public.v_comercial_students_status

CREATE OR REPLACE VIEW public.v_comercial_students_status
AS      SELECT 
    s.id AS view_student_id,
    bot_activ.validos,
    CASE 
        WHEN bot_activ.validos > 1 THEN 'Candidato a varios bootcamps'
        WHEN bot_activ.validos IS NULL THEN ''
        ELSE (
            SELECT string_agg(sbs.student_bootcamp_status::text, ',') 
            FROM student_bootcamp sb
            JOIN student_bootcamp_status sbs ON sb.status_id = sbs.id
            JOIN bootcamps b ON sb.bootcamp_id = b.id
            WHERE sb.student_id = s.id AND b.end_date >= CURRENT_DATE
        )
    END AS comercial_status
FROM students s
LEFT JOIN (
    SELECT 
        COUNT(*) AS validos,
        sb_1.student_id
    FROM student_bootcamp sb_1
    JOIN bootcamps b ON b.id = sb_1.bootcamp_id
    WHERE b.end_date >= CURRENT_DATE
    GROUP BY sb_1.student_id
) AS bot_activ ON s.id = bot_activ.student_id;

drop view if exists public.v_commercial_students

CREATE OR REPLACE VIEW public.v_commercial_students
AS SELECT DISTINCT ON (s.id) s.id,
    s.name,
    s.surname1,
    s.personal_email,
    s.dni,
    s.surname2,
    s.birth_date,
    s.phone,
    s.campus_email,
    s.fct_school,
    s.fct_start,
    s.fct_end,
    s.tutor,
    s.udemy,
    s.github_user,
    s.spain_comunity,
    s.location,
    s.user_id,
    s.student_status_id,
    s.creation_date,
    v.employment_status,
    vn.last_note,
    css.comercial_status
   FROM students s
     JOIN student_bootcamp sb ON s.id = sb.student_id
     JOIN bootcamps b ON sb.bootcamp_id = b.id
     left JOIN v_recent_employment_status v ON v.student_id = s.id
     left JOIN v_last_note vn ON vn.student_id = s.id
     left join v_comercial_students_status css on css.view_student_id=s.id
     WHERE (b.end_date IS NULL OR b.end_date >= CURRENT_DATE)