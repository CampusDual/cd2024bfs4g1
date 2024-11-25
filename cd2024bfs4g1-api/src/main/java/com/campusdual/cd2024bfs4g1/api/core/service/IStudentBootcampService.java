package com.campusdual.cd2024bfs4g1.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IStudentBootcampService {

    EntityResult studentBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult studentsWithBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult studentsWithBootcampQuery(Map<String, Object> keysValues, List<String> attributes);

    EntityResult studentsWithBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampQuery(Map<String, Object> keysValues, List<String> attributes);

    EntityResult studentBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    AdvancedEntityResult studentsWithBootcampPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException;

}