package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
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

        return this.daoHelper.insert(this.bootcampDao, attrMap);
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

}
