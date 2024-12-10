package com.campusdual.cd2024bfs4g1.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "AttendanceDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/AttendanceDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class AttendanceDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID =          "id";
    public static final String ATTR_STUDENT_ID =  "student_id";
    public static final String ATTR_BOOTCAMP_ID = "bootcamp_id";
    public static final String ATTR_STATUS_ID =    "attendance_status_id";
    public static final String ATTR_DATE =        "date";
}
