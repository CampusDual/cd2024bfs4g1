INSERT INTO public.troutes (id, permissionid, enabled, id_rolename) VALUES(33, 'commercial-permission', true, 1);
INSERT INTO public.troutes (id, permissionid, enabled, id_rolename) VALUES(34, 'commercial-permission', true, 2);
INSERT INTO public.troutes (id, permissionid, enabled, id_rolename) VALUES(35, 'commercial-permission', false, 3);
INSERT INTO public.troutes (id, permissionid, enabled, id_rolename) VALUES(36, 'commercial-permission', false, 4);

INSERT INTO public.tmenu (id, attr, visible, enabled, id_rolename) VALUES('31', 'commercialsection', true, true, 1);
INSERT INTO public.tmenu (id, attr, visible, enabled, id_rolename) VALUES('32', 'commercialsection', true, true, 2);
INSERT INTO public.tmenu (id, attr, visible, enabled, id_rolename) VALUES('33', 'commercialsection', false, false, 3);
INSERT INTO public.tmenu (id, attr, visible, enabled, id_rolename) VALUES('34', 'commercialsection', false, false, 4);


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
    s.notes,
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