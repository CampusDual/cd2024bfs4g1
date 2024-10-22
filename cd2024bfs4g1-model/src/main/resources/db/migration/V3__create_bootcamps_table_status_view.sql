CREATE TABLE bootcamps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE OR REPLACE VIEW bootcamp_status AS
SELECT
    id,
    name,
    start_date,
    end_date,
    CASE
        WHEN CURRENT_DATE > end_date THEN 'Finished'
        WHEN CURRENT_DATE < start_date THEN 'Pending'
        ELSE 'Started'
    END AS status
FROM bootcamps;

INSERT INTO bootcamps VALUES(1,'Bootcamp 1','2024-11-10','2024-12-12');
INSERT INTO bootcamps VALUES(2,'Bootcamp 2','2024-09-10','2024-12-12');
INSERT INTO bootcamps VALUES(3,'Bootcamp 3','2023-11-10','2024-12-12');
INSERT INTO bootcamps VALUES(4,'Bootcamp 4','2025-10-10','2026-12-12');
INSERT INTO bootcamps VALUES(5,'Bootcamp 5','2023-10-10','2024-12-12');