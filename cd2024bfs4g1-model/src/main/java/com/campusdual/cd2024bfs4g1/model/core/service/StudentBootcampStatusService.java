package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampStatusService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("StudentBootcampStatusService")
@Lazy
public class StudentBootcampStatusService implements IStudentBootcampStatusService {

    @Autowired
    private StudentBootcampStatusDao studentBootcampStatusDao;

    @Autowired
    private StudentBootcampDao studentBootcampDao;

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
        try {

            int statusId = (int) keyMap.get("id");

            if (statusId == 1) {
                EntityResult error = new EntityResultMapImpl();
                error.setMessage("CANNOT_DELETE_DEFAULT_STATUS");
                error.setCode(EntityResult.OPERATION_WRONG);
                return error;
            }

            if (isStudentStatusInUse(statusId)) {
                EntityResult error = new EntityResultMapImpl();
                error.setMessage("NOT_DELETABLE_STUDENT_STATUS_IS_IN_USE");
                error.setCode(EntityResult.OPERATION_WRONG);
                return error;
            }

            return this.daoHelper.delete(this.studentBootcampStatusDao, keyMap);

        } catch (Exception e) {
            throw new OntimizeJEERuntimeException("Unexpected error while deleting student status", e);
        }
    }


        private boolean isStudentStatusInUse(int statusId) {
            Map<String, Object> filter = new HashMap<>();
            filter.put("status_id", statusId);

            EntityResult result = this.daoHelper.query(this.studentBootcampDao, filter, Arrays.asList("status_id"));
            return result.calculateRecordNumber() > 0;
        }
    }

