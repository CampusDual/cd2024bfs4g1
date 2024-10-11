package com.campusdual.cd2024bfs4g1.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ontimize.jee.server.rest.ORestController;
import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampService;

@RestController
@RequestMapping("/bootcamps")
public class BootcampRestController extends ORestController<IBootcampService> {

    @Autowired
    private IBootcampService bootcampService;

    @Override
    public IBootcampService getService() {
        return this.bootcampService;
    }
}