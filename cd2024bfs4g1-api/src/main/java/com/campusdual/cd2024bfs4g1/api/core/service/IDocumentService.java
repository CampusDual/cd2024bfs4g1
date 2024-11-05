package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IDocumentService {

    public EntityResult personalFilesQuery(Map<String, Object> keyMap, List<String> attrList);//throws OntimizeJEERuntimeException;

    public EntityResult personalFileInsert(Map<String, Object> attrMap);//throws OntimizeJEERuntimeException;

    EntityResult personalFilesDelete(Map<String, Object> keyMap);//throws OntimizeJEERuntimeException;

    EntityResult myPersonalFilesContentQuery(Map<String, Object> keyMap, List<String> attrList);
}