--CREACION TABLA SESSIONS
CREATE TABLE public.sessions (
	id serial4 NOT NULL,
	id_bootcamp int4 NOT NULL,
	session_name varchar(255) NULL,
	session_date timestamptz NULL,
	link text NULL,
	"password" varchar(255) NULL,
	CONSTRAINT sessions_pkey PRIMARY KEY (id),
	CONSTRAINT fk_bootcamp FOREIGN KEY (id_bootcamp) REFERENCES public.bootcamps(id)
);

--CREACION VISTA SESSIONS ACTIVE
CREATE OR REPLACE VIEW sessions_status AS
SELECT
    id,
    id_bootcamp,
    session_name,
    session_date,
    link,
    "password",
    CASE
        WHEN session_date::date < CURRENT_DATE THEN 'Finished'
        WHEN session_date::date = CURRENT_DATE THEN 'Started'
        ELSE 'Pending'
    END AS status
FROM sessions;