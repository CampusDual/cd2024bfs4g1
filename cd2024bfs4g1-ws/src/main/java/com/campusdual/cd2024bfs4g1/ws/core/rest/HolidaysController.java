package com.campusdual.cd2024bfs4g1.ws.core.rest;


import com.campusdual.cd2024bfs4g1.api.core.service.IHolidaysService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/holidays")
public class HolidaysController extends ORestController<IHolidaysService> {

    @Autowired
    private IHolidaysService holidaysService;

    @Override
    public IHolidaysService getService() {
        return this.holidaysService;
    }
}
