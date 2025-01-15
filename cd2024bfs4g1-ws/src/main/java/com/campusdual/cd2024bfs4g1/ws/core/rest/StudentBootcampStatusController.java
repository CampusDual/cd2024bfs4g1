package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampTimetableService;
import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampStatusService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studentbootcampstatus")
public class StudentBootcampStatusController extends ORestController<IStudentBootcampStatusService> {

    @Autowired
    private IStudentBootcampStatusService iStudentBootcampStatusService;

    @Override
    public IStudentBootcampStatusService getService() {
        return this.iStudentBootcampStatusService;
    }
}
