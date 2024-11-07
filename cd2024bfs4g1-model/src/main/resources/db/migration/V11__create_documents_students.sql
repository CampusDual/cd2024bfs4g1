CREATE TABLE public.documents (
	id serial4 NOT NULL,
	file_path varchar(1000) NOT NULL,
	"name" varchar(500) NOT NULL,
	CONSTRAINT documents_pkey PRIMARY KEY (id)
);

CREATE TABLE public.student_document (
	id serial4 NOT NULL,
	student_id int4 NULL,
	document_id int4 NULL,
	CONSTRAINT sb_student_id_document_id_key UNIQUE (student_id, document_id),
	CONSTRAINT student_document_pkey1 PRIMARY KEY (id),
	CONSTRAINT sb_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id),
	CONSTRAINT sb_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id)
);