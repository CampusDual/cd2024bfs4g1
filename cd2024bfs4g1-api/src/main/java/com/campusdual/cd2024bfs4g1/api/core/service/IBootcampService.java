package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IBootcampService {

    // BOOTCAMP
    EntityResult bootcampQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult bootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult bootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult bootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    AdvancedEntityResult bootcampPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException;
}
