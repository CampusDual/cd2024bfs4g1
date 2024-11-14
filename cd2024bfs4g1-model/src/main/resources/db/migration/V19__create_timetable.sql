CREATE TABLE bootcamp_timetable (
    id SERIAL PRIMARY KEY,
    id_bootcamp INT REFERENCES bootcamps(id),
    time_start timetz NOT NULL,
    time_end timetz NOT null,
    day_start timestamptz NOT NULL,
    day_end timestamptz NOT null

);