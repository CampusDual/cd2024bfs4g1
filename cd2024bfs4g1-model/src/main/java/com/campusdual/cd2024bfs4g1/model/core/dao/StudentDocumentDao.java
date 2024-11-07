package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository("StudentDocumentDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/StudentDocumentDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class StudentDocumentDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_ID_STUDENT = "student_id";
    public static final String ATTR_ID_DOCUMENT = "document_id";
}