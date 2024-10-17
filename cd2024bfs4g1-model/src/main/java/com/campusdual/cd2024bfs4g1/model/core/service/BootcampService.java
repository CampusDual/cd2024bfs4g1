package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("BootcampService")
@Lazy
public class BootcampService implements IBootcampService {

    @Autowired
    private BootcampDao bootcampDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult bootcampQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.bootcampDao, keyMap, attrList);
    }

    @Override
    public EntityResult bootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        Date startDate = (Date) attrMap.get(BootcampDao.ATTR_START_DATE);
        Date finishDate = (Date) attrMap.get(BootcampDao.ATTR_FINISH_DATE);

        if (finishDate.before(startDate)) {
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
        Date startDate = (Date) mapResult.get(BootcampDao.ATTR_START_DATE);
        Date finishDate = (Date) mapResult.get(BootcampDao.ATTR_FINISH_DATE);
        Date finalFinishDate = (Date) attrMap.get(BootcampDao.ATTR_FINISH_DATE);
        Date finalStartDate = (Date) attrMap.get(BootcampDao.ATTR_START_DATE);

        if (finalFinishDate != null && finalStartDate == null) {
            if (finalFinishDate.before(startDate)) {
                EntityResult error = new EntityResultMapImpl();
                error.setCode(EntityResult.OPERATION_WRONG);
                error.setMessage("END_DATE_MORE_THAN_INIT_DATE");
                return error;
            }
        }

        if (finalStartDate != null && finalFinishDate == null) {
            if (finishDate.before(finalStartDate)) {
                EntityResult error = new EntityResultMapImpl();
                error.setCode(EntityResult.OPERATION_WRONG);
                error.setMessage("END_DATE_MORE_THAN_INIT_DATE");
                return error;
            }
        }

        if (finalFinishDate != null && finalStartDate != null) {
            if (finalFinishDate.before(finalStartDate)) {
                EntityResult error = new EntityResultMapImpl();
                error.setCode(EntityResult.OPERATION_WRONG);
                error.setMessage("END_DATE_MORE_THAN_INIT_DATE");
                return error;
            }
        }

        return this.daoHelper.update(this.bootcampDao, attrMap, keyMap);
    }

    @Override
    public EntityResult bootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.bootcampDao, keyMap);
    }
}
