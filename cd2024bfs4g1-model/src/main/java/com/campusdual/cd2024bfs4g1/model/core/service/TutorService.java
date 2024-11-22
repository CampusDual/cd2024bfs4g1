package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.ITutorService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("TutorService")
@Lazy
public class TutorService implements ITutorService {

    @Autowired
    private TutorDao tutorDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private TutorBootcampDao tutorBootcampDao;

    @Override
    public EntityResult tutorQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(tutorDao, keyMap, attributes);
    }

    @Override
    public EntityResult tutorInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(tutorDao, attrMap);
    }

    @Override
    public EntityResult tutorUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(tutorDao, attrMap, keyMap);
    }

    @Override
    public EntityResult tutorDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(tutorDao, keyMap);
    }
    @Override
    public AdvancedEntityResult tutorPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.tutorDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }
}
