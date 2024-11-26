package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ITutorBootcampService {
    EntityResult tutorBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult tutorBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult tutorsWithBootcampQuery(Map<String, Object> keysValues, List<String> attributes);

    EntityResult tutorBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    
    AdvancedEntityResult tutorsWithBootcampPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException;

}
