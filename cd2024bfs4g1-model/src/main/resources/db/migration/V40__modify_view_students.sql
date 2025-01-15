DROP VIEW IF EXISTS v_students_with_bootcamps;

CREATE OR REPLACE VIEW public.v_students_with_bootcamps
as SELECT st.id,
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
    concat(t.name, ' ', t.surname1, ' ', t.surname2) as tutor_name_surname,
    st.udemy,
    st.github_user,
    st.notes,
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
     left join tutors t on t.id=st.tutor
     LEFT JOIN ( SELECT count(*) AS validos,
            sb_1.student_id
           FROM student_bootcamp sb_1
             JOIN bootcamps b ON b.id = sb_1.bootcamp_id
          WHERE b.end_date >= CURRENT_DATE
          GROUP BY sb_1.student_id) bot_activ ON st.id = bot_activ.student_id
  GROUP BY t.name,t.surname1, t.surname2 , st.id, ss.status, vres.employment_status, vres.v_employment_status_id, uu.usr_id, bot_activ.student_id, bot_activ.validos
  ORDER BY (st.name COLLATE "es-ES-x-icu");