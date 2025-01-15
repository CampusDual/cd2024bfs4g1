package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "AttendanceControlDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/AttendanceControlDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class AttendanceControlDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_ABBREVIATION = "abbreviation";
    public static final String ATTR_DESCRIPCION = "description";
    public static final String ATTR_COLOR = "color";
}
