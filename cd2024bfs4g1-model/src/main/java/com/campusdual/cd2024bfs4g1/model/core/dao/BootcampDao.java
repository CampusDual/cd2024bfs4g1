package com.campusdual.cd2024bfs4g1.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("BootcampDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/BootcampDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class BootcampDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_NAME = "name";
    public static final String ATTR_START_DATE = "start_date";
    public static final String ATTR_FINISH_DATE = "end_date";
    public static final String ATTR_STATUS = "status";
    public static final String ATTR_DESCRIPTION = "description";
    public static final String ATTR_NOTES = "notes";
    public static final String ATTR_CODIGO ="codigo";
    public static final String ATTR_OP="op";

}
