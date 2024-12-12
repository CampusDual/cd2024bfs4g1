drop view v_students_with_bootcamps;

create or replace view v_students_with_bootcamps as
select st.*,uu.*,ss.status,vres.employment_status,vres.v_employment_status_id,concat(concat('|', string_agg(sb.bootcamp_id::text, '|')), '|') bootcamps_id,bot_activ.validos
from students st
left join usr_user uu on st.user_id = uu.usr_id
left join employment_status es on st.employment_status_id = es.id
left join student_status ss on st.student_status_id = ss.id
left join v_recent_employment_status vres on st.id = vres.student_id
left join student_bootcamp sb on sb.student_id = st.id
left join (select count(*) validos , sb.student_id
            from student_bootcamp sb
            join bootcamps b on b.id = sb.bootcamp_id where b.end_date >= current_date
            group by sb.student_id)bot_activ on st.id = bot_activ.student_id
group by st.id, ss.status,vres.employment_status,vres.v_employment_status_id,uu.usr_id,bot_activ.student_id,bot_activ.validos
order by st.name collate "es-ES-x-icu";

drop view bootcamp_status;

CREATE OR REPLACE VIEW public.bootcamp_status
AS SELECT bootcamps.id,bootcamps.name,bootcamps.start_date,bootcamps.end_date,bootcamps.description,bootcamps.notes,bootcamps.codigo,bootcamps.op,
        CASE
            WHEN CURRENT_DATE > bootcamps.end_date THEN 'Finished'::text
            WHEN CURRENT_DATE < bootcamps.start_date THEN 'Pending'::text
            ELSE 'Started'::text
        END AS status
   FROM bootcamps
   order by name collate "es-ES-x-icu";

CREATE OR REPLACE VIEW public.pending_bootcamps
   AS SELECT bootcamp_status.id,bootcamp_status.name,bootcamp_status.start_date,bootcamp_status.end_date,bootcamp_status.description,bootcamp_status.notes,bootcamp_status.codigo,bootcamp_status.op,bootcamp_status.status
      FROM bootcamp_status
     WHERE bootcamp_status.status = 'Pending'::text
     order by name collate "es-ES-x-icu";

CREATE OR REPLACE VIEW public.bootcamp_status
AS SELECT bootcamps.id,bootcamps.name,bootcamps.start_date,bootcamps.end_date,bootcamps.description,bootcamps.notes,bootcamps.codigo,bootcamps.op,
        CASE
            WHEN CURRENT_DATE > bootcamps.end_date THEN 'Finished'::text
            WHEN CURRENT_DATE < bootcamps.start_date THEN 'Pending'::text
            ELSE 'Started'::text
        END AS status
   FROM bootcamps
   order by name collate "es-ES-x-icu";

drop view sessions_status;

CREATE OR REPLACE VIEW public.sessions_status
AS SELECT sessions.id,sessions.id_bootcamp,sessions.session_name,sessions.session_date,sessions.link,sessions.password,
        CASE
            WHEN sessions.session_date::date < CURRENT_DATE THEN 'Finished'::text
            WHEN sessions.session_date::date = CURRENT_DATE THEN 'Started'::text
            ELSE 'Pending'::text
        END AS status
   FROM sessions
   order by session_name collate "es-ES-x-icu";
