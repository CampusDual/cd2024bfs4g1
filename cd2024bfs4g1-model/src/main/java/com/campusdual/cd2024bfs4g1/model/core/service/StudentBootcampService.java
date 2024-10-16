package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("StudentBootcampService")
@Lazy
public class StudentBootcampService implements IStudentBootcampService {

    @Autowired
    private StudentBootcampDao studentBootcampDao;
    private StudentDao studentDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult studentBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
       try {
           return this.daoHelper.insert(this.studentBootcampDao, attrMap);
       } catch (DuplicateKeyException e) {
           EntityResult entityResultError = new EntityResultMapImpl();
           entityResultError.setCode(EntityResult.OPERATION_WRONG);
           entityResultError.setMessage("Error, this already exists");
           return entityResultError;
       } catch (Exception generalException) {
           throw generalException;
       }
    }

    @Override
      public EntityResult studentBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
          return this.daoHelper.delete(this.studentBootcampDao, keyMap);
    }
     @Override
    public EntityResult studentsWithBootcampQuery(Map<String, Object> keysValues, List<String> attributes) {
        return this.daoHelper.query(this.studentBootcampDao, keysValues, attributes);
    }
    public EntityResult studentBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException{
        return this.daoHelper.update(this.studentDao, attrMap, keyMap);
    };


}
