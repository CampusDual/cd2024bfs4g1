package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "StudentBootcampDao")
@ConfigurationFile(
        configurationFile = "dao/StudentBootcampDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class StudentBootcampDao extends OntimizeJdbcDaoSupport {
    public static final String TABLE_ID = "ID";
    public static final String STUDENT_ID = "STUDENT_ID";
    public static final String BOOTCAMP_ID = "BOOTCAMP_ID";
}