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
        public static final String STU_ID   = "ID";
        public static final String NAME     = "NAME";
        public static final String SURNAMES = "SURNAMES";
        public static final String EMAIL    = "EMAIL";
}