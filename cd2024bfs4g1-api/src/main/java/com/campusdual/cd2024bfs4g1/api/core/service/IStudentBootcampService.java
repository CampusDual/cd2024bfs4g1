package com.campusdual.cd2024bfs4g1.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IStudentBootcampService {

    EntityResult studentBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult studentsWithBootcampQuery(Map<String, Object> keysValues, List<String> attributes);

}