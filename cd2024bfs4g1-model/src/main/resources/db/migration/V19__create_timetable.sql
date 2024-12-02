CREATE TABLE bootcamp_timetable (
    id SERIAL PRIMARY KEY,
    id_bootcamp INT REFERENCES bootcamps(id),
    time_start varchar NOT NULL,
    time_end varchar NOT null,
    day_start timestamptz NOT NULL,
    day_end timestamptz NOT null

);