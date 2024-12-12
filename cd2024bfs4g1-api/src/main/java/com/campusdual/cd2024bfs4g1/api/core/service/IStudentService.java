package com.campusdual.cd2024bfs4g1.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IStudentService {

    EntityResult studentQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult studentInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult studentUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult studentDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    AdvancedEntityResult studentPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException;

    EntityResult commercialStudentQuery(Map<String, Object> keysMap, List<String> attributes) throws OntimizeJEERuntimeException;

    AdvancedEntityResult commercialStudentPaginationQuery(Map<String, Object> keyMap, List<?> attrList, int recordNumber, int startIndex, List<?> orderBy) throws OntimizeJEERuntimeException;
}
