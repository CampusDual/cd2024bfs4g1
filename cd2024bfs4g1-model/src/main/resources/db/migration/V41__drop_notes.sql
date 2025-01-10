ALTER TABLE public.notas ALTER COLUMN nota TYPE text USING nota::text;

DROP VIEW IF EXISTS v_commercial_students;

CREATE OR REPLACE VIEW public.v_commercial_students
AS WITH estados AS (
         SELECT s_1.id AS student_id,
            'Interesado'::text AS status
           FROM students s_1
             LEFT JOIN student_bootcamp sb ON s_1.id = sb.student_id
          WHERE sb.bootcamp_id IS NULL
        UNION
         SELECT s_1.id AS student_id,
            'Inactivo'::text AS status
           FROM students s_1
             JOIN student_bootcamp sb ON s_1.id = sb.student_id
             JOIN bootcamps b ON sb.bootcamp_id = b.id
          WHERE b.end_date IS NOT NULL AND b.end_date < CURRENT_DATE AND NOT (EXISTS ( SELECT 1
                   FROM bootcamps b2
                     JOIN student_bootcamp sb2 ON b2.id = sb2.bootcamp_id
                  WHERE sb2.student_id = s_1.id AND b2.start_date <= CURRENT_DATE AND (b2.end_date IS NULL OR b2.end_date >= CURRENT_DATE)))
        UNION
         SELECT s_1.id AS student_id,
            'Inscrito'::text AS status
           FROM students s_1
             JOIN student_bootcamp sb ON s_1.id = sb.student_id
             JOIN bootcamps b ON sb.bootcamp_id = b.id
          WHERE b.start_date > CURRENT_DATE AND NOT (EXISTS ( SELECT 1
                   FROM bootcamps b2
                     JOIN student_bootcamp sb2 ON b2.id = sb2.bootcamp_id
                  WHERE sb2.student_id = s_1.id AND b2.start_date <= CURRENT_DATE AND (b2.end_date IS NULL OR b2.end_date >= CURRENT_DATE)))
        )
 SELECT DISTINCT ON (s.id) s.id,
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
    s.email,
    s.surnames,
    s.spain_comunity,
    s.location,
    s.employment_status_id,
    s.user_id,
    s.student_status_id,
    estados.status
   FROM students s
     JOIN estados ON s.id = estados.student_id
  ORDER BY s.id, (
        CASE
            WHEN estados.status = 'Interesado'::text THEN 1
            WHEN estados.status = 'Inscrito'::text THEN 2
            WHEN estados.status = 'Inactivo'::text THEN 3
            ELSE NULL::integer
        END);

DROP VIEW IF EXISTS v_students_with_bootcamps;

CREATE OR REPLACE VIEW public.v_students_with_bootcamps
AS SELECT st.id,
    st.name,
    st.surname1,
    st.personal_email,
    st.dni,
    st.surname2,
    st.birth_date,
    st.phone,
    st.campus_email,
    st.fct_school,
    st.fct_start,
    st.fct_end,
    st.tutor,
    concat(t.name, ' ', t.surname1, ' ', t.surname2) AS tutor_name_surname,
    st.udemy,
    st.github_user,
    st.email,
    st.surnames,
    st.spain_comunity,
    st.location,
    st.employment_status_id,
    st.user_id,
    st.student_status_id,
    st.linkedin,
    uu.usr_id,
    uu.usr_login,
    uu.usr_name,
    uu.usr_surname,
    uu.usr_email,
    uu.usr_password,
    uu.usr_notes,
    uu.usr_phone,
    uu.usr_creation_date,
    uu.usr_down_date,
    uu.usr_photo,
    ss.status,
    vres.employment_status,
    vres.v_employment_status_id,
    concat(concat('|', string_agg(sb.bootcamp_id::text, '|'::text)), '|') AS bootcamps_id,
    bot_activ.validos
   FROM students st
     LEFT JOIN usr_user uu ON st.user_id = uu.usr_id
     LEFT JOIN employment_status es ON st.employment_status_id = es.id
     LEFT JOIN student_status ss ON st.student_status_id = ss.id
     LEFT JOIN v_recent_employment_status vres ON st.id = vres.student_id
     LEFT JOIN student_bootcamp sb ON sb.student_id = st.id
     LEFT JOIN tutors t ON t.id = st.tutor
     LEFT JOIN ( SELECT count(*) AS validos,
            sb_1.student_id
           FROM student_bootcamp sb_1
             JOIN bootcamps b ON b.id = sb_1.bootcamp_id
          WHERE b.end_date >= CURRENT_DATE
          GROUP BY sb_1.student_id) bot_activ ON st.id = bot_activ.student_id
  GROUP BY t.name, t.surname1, t.surname2, st.id, ss.status, vres.employment_status, vres.v_employment_status_id, uu.usr_id, bot_activ.student_id, bot_activ.validos
  ORDER BY (st.name COLLATE "es-ES-x-icu");

ALTER TABLE public.students DROP COLUMN notes;