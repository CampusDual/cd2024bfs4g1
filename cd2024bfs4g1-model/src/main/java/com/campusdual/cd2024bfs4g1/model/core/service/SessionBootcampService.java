package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.ISessionBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.dao.SessionBootcampDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service("SessionBootcampService")
@Lazy
public class SessionBootcampService implements ISessionBootcampService {
    @Autowired
    private SessionBootcampDao sessionBootcampDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult sessionBootcampQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.sessionBootcampDao, keyMap, attributes);
    }

    @Override
    public EntityResult sessionBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.sessionBootcampDao,attrMap);
    }

    @Override
    public EntityResult sessionBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.sessionBootcampDao,attrMap,keyMap);
    }

    @Override
    public EntityResult sessionBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.sessionBootcampDao,keyMap);
    }

    @Override
    public AdvancedEntityResult sessionBootcampPaginationQuery(Map<String, Object> keyMap, List<?> attrList, int recordNumber, int startIndex, List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.sessionBootcampDao,keyMap,attrList,recordNumber,startIndex,orderBy);
    }
}
