package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IBootcampTimetableService;
import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bootcamptimetable")
public class BootcampTimetableRestController extends ORestController<IBootcampTimetableService> {

    @Autowired
    private IBootcampTimetableService bootcampTimetableService;

    @Override
    public IBootcampTimetableService getService() {
        return this.bootcampTimetableService;
    }

}
