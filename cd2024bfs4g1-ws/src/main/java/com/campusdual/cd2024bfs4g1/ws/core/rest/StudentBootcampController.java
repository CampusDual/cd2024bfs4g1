package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/studentBootcamps")
public class StudentBootcampController extends ORestController<IStudentBootcampService>{

    @Autowired
    private IStudentBootcampService studentBootcampSrv;

    @Override
    public IStudentBootcampService getService() {
        return this.studentBootcampSrv;
    }

}
