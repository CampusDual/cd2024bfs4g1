package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampStatusService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("StudentBootcampStatusService")
@Lazy
public class StudentBootcampStatusService implements IStudentBootcampStatusService {

    @Autowired
    private StudentBootcampStatusDao studentBootcampStatusDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult studentBootcampStatusQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(studentBootcampStatusDao, keyMap, attributes);
    }

    @Override
    public EntityResult studentBootcampStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(studentBootcampStatusDao, attrMap);
    }

    @Override
    public EntityResult studentBootcampStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(studentBootcampStatusDao, attrMap, keyMap);
    }

    @Override
    public EntityResult studentBootcampStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(studentBootcampStatusDao, keyMap);
    }
}
