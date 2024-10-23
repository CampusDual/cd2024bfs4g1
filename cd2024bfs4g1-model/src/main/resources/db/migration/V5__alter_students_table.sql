ALTER TABLE students
  RENAME COLUMN surnames TO "surname1";
ALTER TABLE students
  RENAME COLUMN email TO "personal_email";

-- Agregar nuevas columnas
ALTER TABLE students
  ADD COLUMN "dni" varchar(9) not null,
  ADD COLUMN "surname2" varchar(255),
  ADD COLUMN "birth_date" date not null,
  ADD COLUMN "phone" varchar(20)not null,
  ADD COLUMN "employment_status" varchar(20)not null,
  ADD COLUMN "campus_email" varchar(200),
  ADD COLUMN "fct_school" varchar(100),
  ADD COLUMN "fct_start" date,
  ADD COLUMN "fct_end" date,
  ADD COLUMN "tutor" varchar(200),
  ADD COLUMN "udemy" boolean not null,
  ADD COLUMN "github_user" varchar(200),
  ADD COLUMN "notes" varchar(1000);