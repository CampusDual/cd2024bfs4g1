package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IPermissionsService {

    public EntityResult permissionQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    public EntityResult menuQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult menuInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult menuUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult menuDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    public EntityResult routeQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult routeInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult routeUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult routeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

}
