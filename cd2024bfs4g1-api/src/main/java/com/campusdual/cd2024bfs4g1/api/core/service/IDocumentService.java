package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IDocumentService {

    public EntityResult personalFilesQuery(Map<String, Object> keyMap, List<String> attrList);

    public EntityResult personalFileInsert(Map<String, Object> attrMap);

    public EntityResult studentdocumentQuery(Map<String, Object> keyMap, List<String> attrList);

    public EntityResult studentdocumentInsert(Map<String, Object> attrMap);

    EntityResult personalFilesDelete(Map<String, Object> keyMap);

    EntityResult myPersonalFilesContentQuery(Map<String, Object> keyMap, List<String> attrList);

    EntityResult studentdocumentDelete(Map<String, Object> keyMap);




    public EntityResult bootcampdocumentQuery(Map<String, Object> keyMap, List<String> attrList);

    public EntityResult bootcampdocumentInsert(Map<String, Object> attrMap);

    EntityResult bootcampdocumentDelete(Map<String, Object> keyMap);

    public EntityResult bootcampFilesContentQuery(Map<String, Object> keyMap, List<String> attrList);
}