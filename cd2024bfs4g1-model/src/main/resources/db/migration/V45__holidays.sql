CREATE TABLE public.holidays (
    id serial4 NOT NULL,
    name varchar(250) NOT NULL,
    holiday_date timestamptz NOT NULL,
    CONSTRAINT holidays_pkey PRIMARY KEY (id)
);
