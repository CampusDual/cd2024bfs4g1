package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IAttendanceControlService {

    EntityResult attendanceControlQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;
    EntityResult attendanceControlInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    EntityResult attendanceControlUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    EntityResult attendanceControlDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    AdvancedEntityResult attendanceControlPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException;
}
