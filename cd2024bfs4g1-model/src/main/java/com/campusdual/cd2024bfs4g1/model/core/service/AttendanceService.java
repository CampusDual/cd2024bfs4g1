package com.campusdual.cd2024bfs4g1.model.core.service;


import com.campusdual.cd2024bfs4g1.api.core.service.IAttendanceService;
import com.campusdual.cd2024bfs4g1.model.core.dao.AttendanceControlDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.AttendanceDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("AttendanceService")
@Lazy
public class AttendanceService implements IAttendanceService {
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private AttendanceDao attendanceDao;


    @Override
    public EntityResult attendanceQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.attendanceDao, keyMap, attributes);
    }

    @Override
    public EntityResult attendanceInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

        return null;
    }

    @Override
    public EntityResult attendanceUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.attendanceDao, attrMap, keyMap);
    }

    @Override
    public EntityResult attendanceDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.attendanceDao, keyMap);
    }

    @Override
    public AdvancedEntityResult attendancePaginationQuery(Map<String, Object> keyMap, List<?> attrList, int recordNumber, int startIndex, List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.attendanceDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }
}
