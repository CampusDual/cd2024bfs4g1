package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Lazy
@Repository("StudentBootcampStatusDao")
@ConfigurationFile(configurationFile = "dao/StudentBootcampStatusDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class StudentBootcampStatusDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_STATUS = "status";
}
