package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IBootcampsService {

    // BOOTCAMP
    EntityResult bootcampsQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult bootcampsInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult bootcampsUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult bootcampsDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
