CREATE TABLE tmenu_bakup AS SELECT attr,visible,enabled,id_rolename FROM tmenu t;

DROP TABLE tmenu;

CREATE TABLE public.tmenu (
    id SERIAL4 NOT NULL,
    attr VARCHAR(250) NOT NULL,
    visible BOOLEAN,
    enabled BOOLEAN,
    id_rolename INTEGER,
    CONSTRAINT tmenu_pkey PRIMARY KEY (id),
    CONSTRAINT tmenu_roles_fkey FOREIGN KEY (id_rolename) REFERENCES public.usr_role(rol_id)
);

INSERT INTO tmenu (attr,visible,enabled,id_rolename) (SELECT * FROM tmenu_bakup ORDER BY attr,id_rolename);

DROP TABLE tmenu_bakup;

CREATE TABLE troutes_bakup AS SELECT permissionid,enabled,id_rolename FROM troutes t;

DROP TABLE troutes;

CREATE TABLE public.troutes (
    id SERIAL4 NOT NULL,
    permissionid VARCHAR(250) NOT NULL,
    enabled BOOLEAN,
    id_rolename INTEGER,
    CONSTRAINT troutes_pkey PRIMARY KEY (id),
    CONSTRAINT troutes_roles_fkey FOREIGN KEY (id_rolename) REFERENCES public.usr_role(rol_id)
);

INSERT INTO troutes (permissionid,enabled,id_rolename) (SELECT * FROM troutes_bakup ORDER BY permissionid,id_rolename);

DROP TABLE troutes_bakup;

INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/menuUpdate');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/menuDelete');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/routeUpdate');
INSERT INTO usr_server_permission(srp_name) VALUES ('com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/routeDelete');

SELECT SETVAL('usr_role_server_permission_rsp_id_seq', (SELECT MAX(rsp_id) FROM usr_role_server_permission), true);

INSERT INTO usr_role_server_permission(rol_id, srp_id)
SELECT (SELECT rol_id FROM usr_role ur WHERE UPPER(rol_name)='ADMIN'), srp_id
FROM usr_server_permission usp WHERE srp_name IN
('com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/menuUpdate',
'com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/menuDelete',
'com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/routeUpdate',
'com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService/routeDelete'
);