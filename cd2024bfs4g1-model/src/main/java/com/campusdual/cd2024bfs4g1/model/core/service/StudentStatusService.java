package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentStatusService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentStatusDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("StudentStatusService")
@Lazy
public class StudentStatusService implements IStudentStatusService {


    @Autowired
    private StudentStatusDao studentStatusDao;

    @Autowired
    private StudentBootcampDao studentBootcampDao;

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
    public EntityResult studentStatusQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {

        return this.daoHelper.query(this.studentStatusDao, keyMap, attributes);
    }

    @Override
    public EntityResult studentStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        if (isEmptyField(attrMap, StudentStatusDao.ATTR_STATUS)) {
            return createErrorResult("STATUS_NAME_CANNOT_BE_EMPTY");
        }

        return this.daoHelper.insert(this.studentStatusDao, attrMap);
    }

    @Override
    public EntityResult studentStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {

        if (isEmptyField(attrMap, StudentStatusDao.ATTR_STATUS)) {
            return createErrorResult("STATUS_NAME_CANNOT_BE_EMPTY");
        }

        return this.daoHelper.update(this.studentStatusDao, attrMap, keyMap);
    }

    @Override
    public EntityResult studentStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        try {

                return this.daoHelper.delete(this.studentStatusDao, keyMap);

        } catch (Exception e) {
            throw new OntimizeJEERuntimeException("Unexpected error while deleting student status", e);
        }
    }


    @Override
    public AdvancedEntityResult studentStatusPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.studentStatusDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }

}
