package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "SessionBootcampDao")
@ConfigurationFile(
        configurationFile = "dao/SessionBootcampDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class SessionBootcampDao extends OntimizeJdbcDaoSupport {
    public static final String ID = "id";
    public static final String ID_BOOTCAMP = "id_bootcamp";
    public static final String SESSION_NAME = "session_name";
    public static final String SESSION_DATE = "session_date";
    public static final String LINK = "link";
    public static final String PASSWORD = "password";
}
