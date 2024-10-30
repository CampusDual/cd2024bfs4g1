package com.campusdual.cd2024bfs4g1.api.core.service;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface IDocumentService {

    //Consulta todos los archivos personales
    public EntityResult personalFilesQuery(Map<String, Object> keyMap, List<String> attrList);//throws OntimizeJEERuntimeException;

    //Inserta archivos personales
    public EntityResult personalFileInsert(Map<String, Object> attrMap);//throws OntimizeJEERuntimeException;

    //Elimina archivos personales
    EntityResult personalFilesDelete(Map<String, Object> keyMap);//throws OntimizeJEERuntimeException;

}
