package com.campusdual.cd2024bfs4g1.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "NotesDao")
@ConfigurationFile(
        configurationFile = "dao/NotesDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class NotesDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID = "id";
    public static final String ATTR_ID_STUDENTS = "id_students";
    public static final String ATTR_NOTA = "nota";
    public static final String ATTR_FECHA = "fecha";

}
