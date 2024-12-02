package com.campusdual.cd2024bfs4g1.ws.core.rest;


import com.campusdual.cd2024bfs4g1.api.core.service.IEmploymentStatusHistoryService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employmentstatushistory")
public class EmploymentStatusHistoryController extends ORestController<IEmploymentStatusHistoryService> {
    @Autowired
    private IEmploymentStatusHistoryService employmentStatusHistoryService;
    @Override
    public IEmploymentStatusHistoryService getService() {
        return this.employmentStatusHistoryService;
    }
}
