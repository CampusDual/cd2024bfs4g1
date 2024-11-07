package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IEmploymentStatusService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employmentstatus")
public class EmploymentStatusController extends ORestController<IEmploymentStatusService> {

    @Autowired
    private IEmploymentStatusService employmentStatusService;

    @Override
    public IEmploymentStatusService getService() {
        return this.employmentStatusService;
    }
}
