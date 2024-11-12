package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "RoutesDao")
@Lazy
@ConfigurationFile( configurationFile = "dao/RoutesDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class RoutesDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_PERMISSIONID = "permissionid";
    public static final String ATTR_ENABLED = "enabled";
    public static final String ATTR_ROLENAME = "rol_name";
    public static final String ATTR_ID_ROLENAME = "id_rolename";
}
