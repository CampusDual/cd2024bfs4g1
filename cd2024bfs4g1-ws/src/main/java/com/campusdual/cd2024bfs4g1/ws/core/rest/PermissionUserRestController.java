package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/permissions")
public class PermissionUserRestController extends ORestController<IPermissionsService> {

    @Autowired
    private IPermissionsService permissionsService;

    @Override
    public IPermissionsService getService() {
        return this.permissionsService;
    }
}
