package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public EntityResult studentsWithComputableQuery(Map<String, Object> keysValues, List<String> attributes) {
        return this.daoHelper.query(this.studentBootcampDao, keysValues, attributes, StudentBootcampDao.QUERY_STUDENTS_WITH_COMPUTABLE);
    }

    @Override
    public EntityResult studentBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        if (!attrMap.containsKey("student_id") || !attrMap.containsKey("bootcamp_id")) {
            return new EntityResultMapImpl(EntityResult.OPERATION_WRONG, EntityResult.NODATA_RESULT);
        }

        try {
            return this.daoHelper.insert(this.studentBootcampDao, attrMap);
        } catch (DuplicateKeyException e) {

            EntityResult entityResultError = new EntityResultMapImpl();
            entityResultError.setCode(EntityResult.OPERATION_WRONG);
            entityResultError.setMessage("ERROR_STUDENT_ALREADY_EXISTS_IN_THIS_BOOTCAMPS");
            return entityResultError;
        } catch (Exception generalException) {
            throw generalException;
        }
    }



    @Override
      public EntityResult studentsWithBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
          return this.daoHelper.delete(this.studentBootcampDao, keyMap);
    }
     @Override
    public EntityResult studentsWithBootcampQuery(Map<String, Object> keysValues, List<String> attributes) {
        return this.daoHelper.query(this.studentBootcampDao, keysValues, attributes);
    }

    @Override
    public EntityResult studentsWithBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.studentBootcampDao,attrMap,keyMap);
    }

    @Override
    public EntityResult studentBootcampQuery(Map<String, Object> keysValues, List<String> attributes) {
        return this.daoHelper.query(this.studentBootcampDao,keysValues,attributes);
    }
    @Override
    public EntityResult studentBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException{
        Date startDate = (Date) attrMap.remove(StudentBootcampDao.SB_START_DATE);
        Date endDate = (Date) attrMap.remove(StudentBootcampDao.SB_END_DATE);
        if(startDate != null){
            attrMap.put(StudentBootcampDao.START_DATE, startDate);
        }
        if(endDate != null){
            attrMap.put(StudentBootcampDao.END_DATE, endDate);
        }
        return this.daoHelper.update(this.studentBootcampDao, attrMap, keyMap);

    }

    @Override
    public AdvancedEntityResult studentsWithBootcampPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.studentBootcampDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }
}
