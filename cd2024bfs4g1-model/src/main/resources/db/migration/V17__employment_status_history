CREATE TABLE employment_status_history (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    employment_status_id INT NOT NULL,
    status_date_change timestamptz NOT NULL,
    description VARCHAR(20),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (employment_status_id) REFERENCES employment_status(id)
);

CREATE VIEW v_recent_employment_status as
SELECT DISTINCT ON (esh.student_id)
    esh.student_id AS student_id,
    es.situation AS employment_status

FROM
    employment_status_history esh
JOIN
    employment_status es ON esh.employment_status_id = es.id
ORDER BY
    esh.student_id, esh.status_date_change DESC;

ALTER TABLE public.students
DROP CONSTRAINT fk_employment_status;

ALTER TABLE public.students
DROP COLUMN employment_status_id;