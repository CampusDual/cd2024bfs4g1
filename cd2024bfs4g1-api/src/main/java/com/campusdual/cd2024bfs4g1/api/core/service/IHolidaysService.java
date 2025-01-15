package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IHolidaysService {

    EntityResult holidaysInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult holidaysDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult holidaysQuery(Map<String, Object> keysValues, List<String> attributes);

    EntityResult holidaysUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;


}
