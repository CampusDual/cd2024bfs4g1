package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.ITutorBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorDao;
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

@Service("TutorBootcampService")
@Lazy
public class TutorBootcampService implements ITutorBootcampService {

    @Autowired
    private TutorBootcampDao tutorBootcampDao;
    private TutorDao tutorDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult tutorBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        if (!attrMap.containsKey("tutor_id") || !attrMap.containsKey("bootcamp_id")) { // Check if the tutor_id is present, if not throw error
            return new EntityResultMapImpl(EntityResult.OPERATION_WRONG, EntityResult.NODATA_RESULT);
        }
        try {
            return this.daoHelper.insert(this.tutorBootcampDao, attrMap);
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
    public EntityResult tutorBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.tutorBootcampDao, keyMap);
    }
    @Override
    public EntityResult tutorsWithBootcampQuery(Map<String, Object> keysValues, List<String> attributes) {
        return this.daoHelper.query(this.tutorBootcampDao, keysValues, attributes);
    }
    @Override
    public EntityResult tutorBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException{
        return this.daoHelper.update(this.tutorDao, attrMap, keyMap);
    }

}
