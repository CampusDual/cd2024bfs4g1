package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorDao;
import com.ontimize.jee.common.db.SQLStatementBuilder;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("BootcampService")
@Lazy
public class BootcampService implements IBootcampService {

    @Autowired
    private BootcampDao bootcampDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private StudentBootcampDao studentBootcampDao;
    @Autowired
    private TutorBootcampDao tutorBootcampDao;


    @Override
    public EntityResult bootcampQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.bootcampDao, keyMap, attrList);
    }

    @Override
    public EntityResult bootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        Date startDate = (Date) attrMap.get(BootcampDao.ATTR_START_DATE);
        Date finishDate = (Date) attrMap.get(BootcampDao.ATTR_FINISH_DATE);

        if (finishDate != null && startDate != null && finishDate.before(startDate)) {
            EntityResult error = new EntityResultMapImpl();
            error.setCode(EntityResult.OPERATION_WRONG);
            error.setMessage("END_DATE_MORE_THAN_INIT_DATE");
            return error;
        }

        EntityResult insertResult = this.daoHelper.insert(this.bootcampDao, attrMap);
        if (insertResult.isWrong()) {
            return insertResult;
        }

        //Recuperamos los tutores
        ArrayList<Integer> tutors = (ArrayList<Integer>) attrMap.get(TutorDao.ATTR_COMBOBOX_TUTOR);
        //Recuperamos el ID del bootcamp
        Integer bootcampId = (Integer) insertResult.get(BootcampDao.ATTR_ID);
        //Por cada tutor insertamos en la tabla de relación
        for (Integer tutorId:tutors){
            Hashtable<String,Object> attrRelation = new Hashtable<>();
            attrRelation.put(TutorBootcampDao.TUTOR_ID, tutorId);
            attrRelation.put(TutorBootcampDao.BOOTCAMP_ID, bootcampId);
            insertResult = this.daoHelper.insert(this.tutorBootcampDao, attrRelation);
        }
        return insertResult;
    }

    @Override
    public EntityResult bootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {


        EntityResult query = this.daoHelper.query(this.bootcampDao, keyMap,
                Arrays.asList(BootcampDao.ATTR_START_DATE, BootcampDao.ATTR_FINISH_DATE));

        Map<String, Object> mapResult = query.getRecordValues(0);
        Date currentStartDate = (Date) mapResult.get(BootcampDao.ATTR_START_DATE);
        Date currentFinishDate = (Date) mapResult.get(BootcampDao.ATTR_FINISH_DATE);

        Date newStartDate = (Date) attrMap.getOrDefault(BootcampDao.ATTR_START_DATE, currentStartDate);
        Date newFinishDate = (Date) attrMap.getOrDefault(BootcampDao.ATTR_FINISH_DATE, currentFinishDate);

        if (newFinishDate != null && newStartDate != null && newFinishDate.before(newStartDate)) {
            return createErrorResult("END_DATE_MORE_THAN_INIT_DATE");
        }

        return this.daoHelper.update(this.bootcampDao, attrMap, keyMap);
    }


    private EntityResult createErrorResult(String message) {
        EntityResult error = new EntityResultMapImpl();
        error.setCode(EntityResult.OPERATION_WRONG);
        error.setMessage(message);
        return error;
    }

    @Override
    public EntityResult bootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        Map<String,Object> deletekey = new Hashtable<>();
        deletekey.put(StudentBootcampDao.BOOTCAMP_ID,keyMap.get(BootcampDao.ATTR_ID));
        EntityResult query = this.daoHelper.query(this.studentBootcampDao,deletekey,Arrays.asList(StudentBootcampDao.BOOTCAMP_ID));
        if(!query.isEmpty()){
            EntityResult error = new EntityResultMapImpl();
            error.setCode(EntityResult.OPERATION_WRONG);
            error.setMessage("BOOTCAMP_HAS_STUDENTS");
            return error;
        }else {
            return this.daoHelper.delete(this.bootcampDao, keyMap);
        }
    }

    @Override
    public AdvancedEntityResult bootcampPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.bootcampDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }

    @Override
    public EntityResult bootcampDateQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        // Se obtienen las fechas de inicio y fin del rango mostrado en la interfaz
        Date startDate = (Date) keyMap.get("startDate");
        Date endDate = (Date) keyMap.get("endDate");

        // Verificar que ambas fechas estén presentes
        if (startDate == null || endDate == null) {
            EntityResult error = new EntityResultMapImpl();
            error.setCode(EntityResult.OPERATION_WRONG);
            error.setMessage("MISSING_DATE_RANGE");
            return error;
        }

        // Filtramos los bootcamps dentro del rango de fechas especificado
        SQLStatementBuilder.BasicField startDateField = new SQLStatementBuilder.BasicField(BootcampDao.ATTR_START_DATE);
        SQLStatementBuilder.BasicField endDateField = new SQLStatementBuilder.BasicField(BootcampDao.ATTR_FINISH_DATE);

        // Se construyen las expresiones de fechas
        SQLStatementBuilder.BasicExpression startDateCondition = new SQLStatementBuilder.BasicExpression(
                startDateField, SQLStatementBuilder.BasicOperator.LESS_EQUAL_OP, endDate);
        SQLStatementBuilder.BasicExpression endDateCondition = new SQLStatementBuilder.BasicExpression(
                endDateField, SQLStatementBuilder.BasicOperator.MORE_EQUAL_OP, startDate);

        // Condición final para asegurar que el bootcamp esté dentro del rango de fechas
        SQLStatementBuilder.BasicExpression dateRangeCondition = new SQLStatementBuilder.BasicExpression(
                startDateCondition, SQLStatementBuilder.BasicOperator.AND_OP, endDateCondition);

        Map<String, Object> queryFilter = new HashMap<>();
        queryFilter.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, dateRangeCondition);

        // Realizamos la consulta
        return this.daoHelper.query(this.bootcampDao, queryFilter, attrList);
    }



}
