package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ITutorTypeService {

    EntityResult tutorTypeQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult tutorTypeInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult tutorTypeUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult tutorTypeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    AdvancedEntityResult tutorTypePaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException;
}
