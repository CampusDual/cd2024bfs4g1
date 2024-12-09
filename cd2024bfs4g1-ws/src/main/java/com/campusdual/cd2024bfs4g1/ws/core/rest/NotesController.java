package com.campusdual.cd2024bfs4g1.ws.core.rest;


import com.campusdual.cd2024bfs4g1.api.core.service.INotesService;

import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notes")
public class NotesController extends ORestController<INotesService> {

    @Autowired
    private INotesService notesService;

    @Override
    public INotesService getService() {
        return this.notesService;
    }
}
