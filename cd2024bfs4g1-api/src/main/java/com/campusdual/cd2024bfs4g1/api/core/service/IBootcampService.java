package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IBootcampService {

    // BOOTCAMP
    EntityResult bootcampQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

}
