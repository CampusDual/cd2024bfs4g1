package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.ISessionBootcampService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sessionbootcamp")
public class SessionBootcampRestController extends ORestController<ISessionBootcampService> {
    @Autowired
    private ISessionBootcampService sessionBootcampSrv;
    @Override
    public ISessionBootcampService getService() {
        return this.sessionBootcampSrv;
    }
}
