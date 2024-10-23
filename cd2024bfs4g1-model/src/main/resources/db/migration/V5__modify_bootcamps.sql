

ALTER TABLE bootcamps
ADD description varchar(150),
ADD notes varchar(200);

DROP VIEW IF EXISTS bootcamp_status;

CREATE OR REPLACE VIEW bootcamp_status AS
SELECT
    id,
    name,
    start_date,
    end_date,
    description,
    notes,
    CASE
        WHEN CURRENT_DATE > end_date THEN 'Finished'
        WHEN CURRENT_DATE < start_date THEN 'Pending'
        ELSE 'Started'
    END AS status
FROM bootcamps;
