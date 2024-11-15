package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IEmploymentStatusService;
import com.campusdual.cd2024bfs4g1.model.core.dao.EmploymentStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("EmploymentStatusService")
@Lazy
public class EmploymentStatusService implements IEmploymentStatusService {


    @Autowired
    private EmploymentStatusDao employmentStatusDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    private boolean isEmptyField(Map<String, Object> map, String key) {
        return !map.containsKey(key) || map.get(key) == null || map.get(key).toString().trim().isEmpty();
    }

    private EntityResult createErrorResult(String message) {
        EntityResult error = new EntityResultMapImpl();
        error.setCode(EntityResult.OPERATION_WRONG);
        error.setMessage(message);
        return error;
    }

    @Override
    public EntityResult employmentStatusQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.employmentStatusDao, keyMap, attributes);
    }

    @Override
    public EntityResult employmentStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        if (isEmptyField(attrMap, employmentStatusDao.ATTR_SITUATION)) {
            return createErrorResult("EMPLOYMENT_STATUS_CANNOT_BE_EMPTY");
        }
        return this.daoHelper.insert(this.employmentStatusDao, attrMap);
    }

    @Override
    public EntityResult employmentStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {

        if (isEmptyField(attrMap, employmentStatusDao.ATTR_SITUATION)) {
            return createErrorResult("EMPLOYMENT_STATUS_CANNOT_BE_EMPTY");
        }
        return this.daoHelper.update(this.employmentStatusDao, attrMap, keyMap);
    }

    @Override
    public EntityResult employmentStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
       try {
           return this.daoHelper.delete(this.employmentStatusDao, keyMap);
       } catch (DataIntegrityViolationException e) {
           EntityResult error = new EntityResultMapImpl();
           error.setMessage("NOT_DELETABLE_EMPLOYMENT_STATUS_IS_IN_USE");
           error.setCode(EntityResult.OPERATION_WRONG);
           return error;
        }
    }
}
