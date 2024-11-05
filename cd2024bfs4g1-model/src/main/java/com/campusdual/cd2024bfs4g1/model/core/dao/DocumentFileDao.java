package com.campusdual.cd2024bfs4g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository("DocumentFileDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/DocumentFileDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class DocumentFileDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_ID_STUDENT = "student_id";
    public static final String ATTR_NAME = "name";
    public static final String ATTR_PATH = "file_path";
    //public static final String ATTR_BASE64 = "base64";

}