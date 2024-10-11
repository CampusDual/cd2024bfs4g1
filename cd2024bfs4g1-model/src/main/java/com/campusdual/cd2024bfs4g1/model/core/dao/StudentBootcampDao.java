package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Repository(value = "StudentBootcampDao")
@Lazy // Que sea vago, es decir que esté dormido y solo se ejecute hasta que lo llamen.
@ConfigurationFile(configurationFile = "dao/StudentBootcampDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class StudentBootcampDao  extends OntimizeJdbcDaoSupport {
    public static final String  ATTR_ID = "id";
    public static final String  ATTR_IDSTUDENT = "student_id";
    public static final String  ATTR_IDBOOTCAMP = "bootcamp_id"; //DUDA, ES NOMBRE TABLA O DEL XML

}
