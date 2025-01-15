package com.campusdual.cd2024bfs4g1.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "HolidaysDao")
@ConfigurationFile(
        configurationFile = "dao/HolidaysDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class HolidaysDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID = "id";
    public static final String ATTR_NAME = "name";
    public static final String ATTR_FECHA = "holiday_date";

}
