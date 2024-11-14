package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampTimetableService;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampTimetableDao;
import com.ontimize.jee.common.db.SQLStatementBuilder;
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

import static com.ontimize.jee.common.db.SQLStatementBuilder.*;

@Service("BootcampTimetableService")
@Lazy
public class BootcampTimetableService implements IBootcampTimetableService {

    @Autowired
    private BootcampTimetableDao bootcampTimetableDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult bootcampTimetableInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        Object newDayStart = attrMap.get(BootcampTimetableDao.ATTR_DAY_START);
        Object newDayEnd = attrMap.get(BootcampTimetableDao.ATTR_DAY_END);
        Object newTimeStart = attrMap.get(BootcampTimetableDao.ATTR_TIME_START);
        Object newTimeEnd = attrMap.get(BootcampTimetableDao.ATTR_TIME_END);
        Object idBootcamp = attrMap.get(BootcampTimetableDao.ATTR_ID_BOOTCAMP);

        if (idBootcamp == null) {
            EntityResult error = new EntityResultMapImpl();
            error.setCode(EntityResult.OPERATION_WRONG);
            error.setMessage("ID_BOOTCAMP_REQUIRED");
            return error;
        }

        SQLStatementBuilder.BasicField dayStartField = new SQLStatementBuilder.BasicField(BootcampTimetableDao.ATTR_DAY_START);
        SQLStatementBuilder.BasicField dayEndField = new SQLStatementBuilder.BasicField(BootcampTimetableDao.ATTR_DAY_END);
        SQLStatementBuilder.BasicField timeStartField = new SQLStatementBuilder.BasicField(BootcampTimetableDao.ATTR_TIME_START);
        SQLStatementBuilder.BasicField timeEndField = new SQLStatementBuilder.BasicField(BootcampTimetableDao.ATTR_TIME_END);
        SQLStatementBuilder.BasicField bootcampIdField = new SQLStatementBuilder.BasicField(BootcampTimetableDao.ATTR_ID_BOOTCAMP);

        // Condiciones para verificar superposición de días
        SQLStatementBuilder.BasicExpression dayCondition1 = new SQLStatementBuilder.BasicExpression(dayStartField, SQLStatementBuilder.BasicOperator.LESS_EQUAL_OP, newDayEnd);
        SQLStatementBuilder.BasicExpression dayCondition2 = new SQLStatementBuilder.BasicExpression(dayEndField, SQLStatementBuilder.BasicOperator.MORE_EQUAL_OP, newDayStart);
        SQLStatementBuilder.BasicExpression dayCondition = new SQLStatementBuilder.BasicExpression(dayCondition1, SQLStatementBuilder.BasicOperator.AND_OP, dayCondition2);

        // Condiciones para verificar superposición de horas
        SQLStatementBuilder.BasicExpression timeCondition1 = new SQLStatementBuilder.BasicExpression(timeStartField, SQLStatementBuilder.BasicOperator.LESS_EQUAL_OP, newTimeEnd);
        SQLStatementBuilder.BasicExpression timeCondition2 = new SQLStatementBuilder.BasicExpression(timeEndField, SQLStatementBuilder.BasicOperator.MORE_EQUAL_OP, newTimeStart);
        SQLStatementBuilder.BasicExpression timeCondition = new SQLStatementBuilder.BasicExpression(timeCondition1, SQLStatementBuilder.BasicOperator.AND_OP, timeCondition2);

        // Combinar condiciones: días deben coincidir Y horarios deben superponerse
        SQLStatementBuilder.BasicExpression combinedCondition = new SQLStatementBuilder.BasicExpression(
                dayCondition,
                SQLStatementBuilder.BasicOperator.AND_OP,
                timeCondition
        );

        // Agregar condición del bootcamp
        SQLStatementBuilder.BasicExpression bootcampCondition = new SQLStatementBuilder.BasicExpression(bootcampIdField, SQLStatementBuilder.BasicOperator.EQUAL_OP, idBootcamp);

        // Combinar con bootcamp
        SQLStatementBuilder.BasicExpression finalCondition = new SQLStatementBuilder.BasicExpression(
                combinedCondition,
                SQLStatementBuilder.BasicOperator.AND_OP,
                bootcampCondition
        );

        Map<String, Object> queryFilter = new HashMap<>();
        queryFilter.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, finalCondition);

        EntityResult conflictResult = this.daoHelper.query(this.bootcampTimetableDao, queryFilter, Arrays.asList(BootcampTimetableDao.ATTR_ID));

        if (!conflictResult.isEmpty()) {
            EntityResult error = new EntityResultMapImpl();
            error.setCode(EntityResult.OPERATION_WRONG);
            error.setMessage("HORARIO_EN_CONFLICTO");
            return error;
        }

        return this.daoHelper.insert(this.bootcampTimetableDao, attrMap);
    }





    @Override
    public EntityResult bootcampTimetableDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.bootcampTimetableDao,keyMap);
    }

    @Override
    public EntityResult bootcampTimetableQuery(Map<String, Object> keysValues, List<String> attributes) {
        return this.daoHelper.query(this.bootcampTimetableDao,keysValues,attributes);
    }

    @Override
    public EntityResult bootcampTimetableUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return null;
    }
}
