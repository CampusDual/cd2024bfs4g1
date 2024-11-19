package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "BootcampTimetableDao")
@ConfigurationFile(
        configurationFile = "dao/BootcampTimetableDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class BootcampTimetableDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_ID_BOOTCAMP = "id_bootcamp";
    public static final String ATTR_TIME_START = "time_start";
    public static final String ATTR_TIME_END = "time_end";
    public static final String ATTR_DAY_START = "day_start";
    public static final String ATTR_DAY_END = "day_end";

}
