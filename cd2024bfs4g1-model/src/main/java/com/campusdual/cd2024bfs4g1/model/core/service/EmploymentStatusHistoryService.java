package com.campusdual.cd2024bfs4g1.model.core.service;
import com.campusdual.cd2024bfs4g1.api.core.service.IEmploymentStatusHistoryService;
import com.campusdual.cd2024bfs4g1.model.core.dao.EmploymentStatusHistoryDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("EmploymentStatusHistoryService")
@Lazy
public class EmploymentStatusHistoryService implements IEmploymentStatusHistoryService {

    @Autowired
    private EmploymentStatusHistoryDao employmentStatusHistoryDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    @Override
    public EntityResult employmentStatusHistoryQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.employmentStatusHistoryDao, keyMap, attributes);
    }

    @Override
    public EntityResult employmentStatusHistoryInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.employmentStatusHistoryDao, attrMap);
    }

    @Override
    public EntityResult employmentStatusHistoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.employmentStatusHistoryDao, attrMap, keyMap);
    }

    @Override
    public EntityResult employmentStatusHistoryDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.employmentStatusHistoryDao, keyMap);
    }
}
