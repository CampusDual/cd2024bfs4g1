package com.campusdual.cd2024bfs4g1.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "TutorBootcampDao")
@ConfigurationFile(
        configurationFile = "dao/TutorBootcampDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class TutorBootcampDao extends OntimizeJdbcDaoSupport {

    public static final String TABLE_ID = "id";
    public static final String TUTOR_ID = "tutor_id";
    public static final String BOOTCAMP_ID = "bootcamp_id";
}
