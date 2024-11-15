package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentStatusService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studentstatus")
public class StudentStatusController extends ORestController<IStudentStatusService> {

    @Autowired
    private IStudentStatusService studentStatusService;
    @Override
    public IStudentStatusService getService() {
        return this.studentStatusService;
    }
}
