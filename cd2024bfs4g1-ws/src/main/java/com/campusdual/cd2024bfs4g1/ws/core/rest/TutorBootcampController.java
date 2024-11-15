package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.ITutorBootcampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/tutorbootcamp")
public class TutorBootcampController extends ORestController<ITutorBootcampService>{

    @Autowired
    private ITutorBootcampService tutorBootcampSrv;

    @Override
    public ITutorBootcampService getService() {
        return this.tutorBootcampSrv;
    }

}