package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentStatusService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("StudentStatusService")
@Lazy
public class StudentStatusService implements IStudentStatusService {


    @Autowired
    private StudentStatusDao studentStatusDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult studentStatusQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {

        return this.daoHelper.query(this.studentStatusDao, keyMap, attributes);
    }

    @Override
    public EntityResult studentStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return null;
    }

    @Override
    public EntityResult studentStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return null;
    }

    @Override
    public EntityResult studentStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return null;
    }
}
