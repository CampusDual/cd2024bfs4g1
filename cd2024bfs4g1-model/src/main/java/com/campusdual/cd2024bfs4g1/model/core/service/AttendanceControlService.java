package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IAttendanceControlService;
import com.campusdual.cd2024bfs4g1.model.core.dao.AttendanceControlDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("AttendanceControlService")
@Lazy
public class AttendanceControlService implements IAttendanceControlService {

    @Autowired
    private AttendanceControlDao attendanceControlDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    @Override
    public EntityResult attendanceControlQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.attendanceControlDao, keyMap, attributes);
    }

    @Override
    public EntityResult attendanceControlInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.attendanceControlDao, attrMap);
    }

    @Override
    public EntityResult attendanceControlUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.attendanceControlDao, attrMap, keyMap);
    }

    @Override
    public EntityResult attendanceControlDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.attendanceControlDao, keyMap);
    }

    @Override
    public AdvancedEntityResult attendanceControlPaginationQuery(Map<String, Object> keyMap, List<?> attrList, int recordNumber, int startIndex, List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.attendanceControlDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }
}
