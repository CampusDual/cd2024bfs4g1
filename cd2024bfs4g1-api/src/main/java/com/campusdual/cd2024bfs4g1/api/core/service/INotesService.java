package com.campusdual.cd2024bfs4g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface INotesService {

    EntityResult notesInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult notesDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult notesQuery(Map<String, Object> keysValues, List<String> attributes);




}
