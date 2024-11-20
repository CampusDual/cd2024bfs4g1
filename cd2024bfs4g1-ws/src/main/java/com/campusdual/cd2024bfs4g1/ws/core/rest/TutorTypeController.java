package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IEmploymentStatusService;
import com.campusdual.cd2024bfs4g1.api.core.service.ITutorTypeService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tutortype")
public class TutorTypeController extends ORestController<ITutorTypeService> {

    @Autowired
    private ITutorTypeService tutorTypeService;

    @Override
    public ITutorTypeService getService() {
        return this.tutorTypeService;
    }
}
