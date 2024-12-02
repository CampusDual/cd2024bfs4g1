package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IBootcampTimetableService {
    EntityResult bootcampTimetableInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult bootcampTimetableDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult bootcampTimetableQuery(Map<String, Object> keysValues, List<String> attributes);

    EntityResult bootcampTimetableUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

}
