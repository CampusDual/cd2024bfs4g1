CREATE TABLE public.bootcamp_document (
	id serial4 NOT NULL,
	bootcamp_id int4 NULL,
	document_id int4 NULL,
	CONSTRAINT bootcamp_document_pkey1 PRIMARY KEY (id),
	CONSTRAINT sb_bootcamp_id_document_id_key UNIQUE (bootcamp_id, document_id),
	CONSTRAINT sb_bootcamp_id_fkey FOREIGN KEY (bootcamp_id) REFERENCES public.bootcamps(id),
	CONSTRAINT sb_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id)
);