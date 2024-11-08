package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import com.ontimize.jee.server.rest.ORestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/students")
public class StudentController extends ORestController<IStudentService>{

    @Autowired
    private IStudentService studentSrv;

    @Override
    public IStudentService getService() {
        return this.studentSrv;
    }

}

