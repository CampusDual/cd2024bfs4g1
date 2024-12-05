package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service("StudentBootcampStatusService")
@Lazy
public interface IStudentBootcampStatusService {


    EntityResult studentBootcampStatusQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult studentBootcampStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
