package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.INotesService;

import com.campusdual.cd2024bfs4g1.model.core.dao.NotesDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service("NotesService")
@Lazy public class NotesService implements INotesService {

    @Autowired
    private NotesDao notesDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult notesInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.notesDao, attrMap);
    }



    @Override
    public EntityResult notesDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.notesDao, keyMap);
    }

    @Override
    public EntityResult notesQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(this.notesDao, keyMap, attrList);
    }


}
