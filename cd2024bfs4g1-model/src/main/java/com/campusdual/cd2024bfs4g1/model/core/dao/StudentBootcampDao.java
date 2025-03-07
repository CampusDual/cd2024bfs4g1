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
    public static final String TABLE_ID = "id";
    public static final String STUDENT_ID = "student_id";
    public static final String BOOTCAMP_ID = "bootcamp_id";
    public static final String STATUS = "status";
    public static final String START_DATE = "start_date";
    public static final String END_DATE = "end_date";
    public static final String SB_START_DATE = "sb_start_date";
    public static final String SB_END_DATE = "sb_end_date";
    public static final String QUERY_STUDENTS_WITH_COMPUTABLE = "studentsWithComputable";


}