package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IEmploymentStatusHistoryService {
    EntityResult employmentStatusHistoryQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult employmentStatusHistoryInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult employmentStatusHistoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult employmentStatusHistoryDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

}
