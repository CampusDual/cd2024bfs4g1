ALTER TABLE public.tutors ADD user_id int4 NULL;


INSERT INTO public.usr_role_server_permission (rol_id,srp_id)
	VALUES (4,1);
INSERT INTO public.usr_role_server_permission (rol_id,srp_id)
	VALUES (4,2);
INSERT INTO public.usr_role_server_permission (rol_id,srp_id)
	VALUES (4,3);
INSERT INTO public.usr_role_server_permission (rol_id,srp_id)
	VALUES (4,4);



INSERT into troutes (id,permissionid,enabled,id_rolename)
	VALUES (24,'tutor-permission','true',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (31,'admin-permission','false',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (30,'settings-permission','false',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (29,'students-permission','false',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (28,'config-permission','false',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (32,'data-permission','true',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (22,'home-permission','false',4 );
INSERT into troutes (permissionid,enabled,id_rolename)
	VALUES (23,'bootcamps-permission','false',4 );




INSERT into tmenu (id,attr,visible,enabled,id_rolename)
	VALUES (19,'bootcamps',	false,	false	,4);
INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (20,'students'	,false	,false	,4;
INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (21,'config',	false,	false,	4);
INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (22,'tutors',	false,	false,	4);

INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (18,'personalinfo'	,false,	false,	4);
INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (26,'personaltutorinfo',	true,	true,	4);

INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (30,'admin',	false	,false,	4);
INSERT into tmenu (attr,visible,enabled,id_rolename)
	VALUES (17,'home',	false,	false	,4);


INSERT INTO public.usr_role (rol_id,rol_name,rol_xml_client_permission,rol_json_client_permission,rol_notes)
    values (4 ,'tutor', '<?xml version="1.0" encoding="UTF-8"?><security><MENU><ELEMENT attr="admin"><Enabled restricted="yes"/><Visible restricted="yes"/></ELEMENT></MENU></security>'
    ,'{ "menu": [{ "attr": "admin", "visible": false, "enabled": false }] }' , 'Rol for tutors');
