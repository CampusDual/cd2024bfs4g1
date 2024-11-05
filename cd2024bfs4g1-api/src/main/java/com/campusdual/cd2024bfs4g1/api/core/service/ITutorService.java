package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ITutorService {


    EntityResult tutorQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult tutorInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult tutorUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult tutorDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
