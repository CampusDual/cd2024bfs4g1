package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("StudentBootcampService")
@Lazy
public class StudentBootcampService implements IStudentBootcampService {
    @Autowired
    private StudentBootcampDao studentBootcampDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    
    
    @Override
    public EntityResult studentBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.studentBootcampDao, attrMap);

    }
    @Override
    public EntityResult studentBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.studentBootcampDao, keyMap);
    }

    @Override
    public EntityResult studentBootcampQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.studentBootcampDao, keyMap, attrList);    }

    @Override
    public EntityResult studentBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return null;
    }


}
