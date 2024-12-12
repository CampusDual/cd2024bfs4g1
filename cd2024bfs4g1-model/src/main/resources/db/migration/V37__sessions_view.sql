drop view public.sessions_status;

CREATE OR REPLACE VIEW public.sessions_status
AS SELECT sessions.id,sessions.id_bootcamp,sessions.session_name,sessions.session_date,sessions.link,sessions.password,
        CASE
            WHEN sessions.session_date < CURRENT_DATE THEN 'Finished'::text
            WHEN sessions.session_date = CURRENT_DATE THEN 'Started'::text
            ELSE 'Pending'::text
        END AS status
   FROM sessions
   order by session_name collate "es-ES-x-icu";