
CREATE TABLE public.tmenu(id varchar(100),attr VARCHAR(100),visible BOOLEAN,enabled BOOLEAN,id_rolename INTEGER)
INSERT INTO public.tmenu (id, attr, visible, enabled, id_rolename)
    VALUES ('1', 'admin', true, true, 1),
           ('2', 'admin', false, false, 2),
           ('3', 'admin', false, false, 3),
           ('4', 'bootcamps', true, true, 1),
           ('5', 'bootcamps', true, true, 2),
           ('6', 'bootcamps', false, false, 3),
           ('7', 'students', true, true, 2),
           ('8', 'students', false, false, 3),
           ('9', 'home', false, false, 3),
           ('10', 'students', true, true, 1),
           ('11', 'personalinfo', true, true, 3),
           ('12', 'personalinfo', false, false, 2),
           ('13', 'personalinfo', false, false, 1);


ALTER TABLE students
ADD COLUMN user_id INT4 NULL;
ALTER TABLE students
ADD CONSTRAINT students_usr_user_fk FOREIGN KEY (user_id) REFERENCES public.usr_user(usr_id);


CREATE TABLE public.troutes (
id INTEGER,
permissionid VARCHAR(100),
enabled BOOLEAN,
id_rolename INTEGER
);
CREATE UNIQUE INDEX troutes_id_idx ON public.troutes (id);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (1,'home-permission',false,3);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (2,'bootcamps-permission',false,3);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (3,'home-permission',true,1);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (4,'home-permission',true,2);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (5,'bootcamps-permission',true,1);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (6,'bootcamps-permission',true,2);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (7,'admin-permission',true,1);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (8,'admin-permission',false,2);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (9,'admin-permission',false,3);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (10,'settings-permission',true,1);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (11,'settings-permission',true,2);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (12,'settings-permission',false,3);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (13,'students-permission',true,1);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (14,'students-permission',true,2);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (15,'students-permission',false,3);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (16,'data-permission',false,1);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (17,'data-permission',false,2);
INSERT INTO public.troutes (id,permissionid,enabled,id_rolename)
VALUES (18,'data-permission',true,3);