package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.ITutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/tutors")
public class TutorController extends ORestController<ITutorService>{

    @Autowired
    private ITutorService tutorSrv;

    @Override
    public ITutorService getService() {
        return this.tutorSrv;
    }

}

