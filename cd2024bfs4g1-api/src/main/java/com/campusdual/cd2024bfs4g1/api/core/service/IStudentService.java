package com.campusdual.cd2024bfs4g1.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IStudentService {

    EntityResult studentQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;

}
