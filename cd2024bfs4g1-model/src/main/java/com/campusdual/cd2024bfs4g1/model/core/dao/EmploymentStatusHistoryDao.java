package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "EmploymentStatusHistoryDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/EmploymentStatusHistoryDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class EmploymentStatusHistoryDao extends OntimizeJdbcDaoSupport {
    // Column names
    public static final String ATTR_ID =                            "id";
    public static final String ATTR_STUDENT_ID =                    "student_id";
    public static final String ATTR_EMPLOYMENT_STATUS_ID =          "employment_status_id";
    public static final String ATTR_STATUS_DATE_CHANGE =            "status_date_change";
    public static final String ATTR_DESCRIPTION =                   "description";
    public static final String ATTR_ACTUAL =                        "actual";

}
