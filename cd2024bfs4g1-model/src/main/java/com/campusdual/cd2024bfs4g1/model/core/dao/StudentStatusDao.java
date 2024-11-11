package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "StudentStatusDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/StudentStatusDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")

public class StudentStatusDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_SITUATION = "status";
}
