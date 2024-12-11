package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "StudentDao")
@ConfigurationFile(
        configurationFile = "dao/StudentDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class StudentDao extends OntimizeJdbcDaoSupport {
        public static final String STU_ID            = "id";
        public static final String NAME              = "name";
        public static final String SURNAME1          = "surname1";
        public static final String PERSONAL_EMAIL    = "email";
        public static final String DNI               = "dni";
        public static final String SURNAME2          = "surname2";
        public static final String BIRTH_DATE        = "birth_date";
        public static final String PHONE             = "phone";
        public static final String EMPLOYMENT_STATUS = "employment_status";
        public static final String CAMPUS_EMAIL      = "campus_email";
        public static final String FCT_SCHOOL        = "fct_school";
        public static final String FCT_START         = "fct_start";
        public static final String FCT_END           = "fct_end";
        public static final String TUTOR             = "tutor";
        public static final String UDEMY             = "udemy";
        public static final String GITHUB_USER       = "github_user";
        public static final String NOTES             = "notes";
        public static final String STATUS            = "status";
        public static final String SPAIN_COMUNITY    = "spain_comunity";
        public static final String LOCATION          = "location";
        public static final String USER_ID           = "user_id";
        public static final String EMPLOYMENT_STATUS_ID         = "employment_status_id";
        public static final String STUDENT_STATUS_ID            = "student_status_id";
}