package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Lazy
@Repository(value = "StudentBootcampDao")
@ConfigurationFile(
        configurationFile = "dao/StudentBootcampDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class StudentBootcampDao extends OntimizeJdbcDaoSupport {
    public static final String TABLE_ID = "id";
    public static final String STUDENT_ID = "student_id";
    public static final String BOOTCAMP_ID = "bootcamp_id";
}