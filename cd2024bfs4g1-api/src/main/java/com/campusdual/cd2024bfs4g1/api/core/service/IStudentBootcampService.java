package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IStudentBootcampService {

    EntityResult studentBootcampInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;


    EntityResult studentBootcampUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}