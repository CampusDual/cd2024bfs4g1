package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Lazy
@Repository(value = "TutorDao")
@ConfigurationFile(
        configurationFile = "dao/TutorDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class TutorDao extends OntimizeJdbcDaoSupport {
    public static final String TU_ID               = "id";
    public static final String NAME                = "name";
    public static final String SURNAME1            = "surname1";
    public static final String SURNAME2            = "surname2";
    public static final String EMAIL               = "email";
    public static final String ATTR_COMBOBOX_TUTOR = "tutor";
    public static final String USER_ID = "user_id";
    public static final String ATTR_TUTORS_PHOTO = "tutors_photo";

}
