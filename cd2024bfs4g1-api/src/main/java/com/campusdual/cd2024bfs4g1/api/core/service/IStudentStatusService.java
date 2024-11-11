package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IStudentStatusService {

    EntityResult studentStatusQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;
    EntityResult studentStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    EntityResult studentStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    EntityResult studentStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
