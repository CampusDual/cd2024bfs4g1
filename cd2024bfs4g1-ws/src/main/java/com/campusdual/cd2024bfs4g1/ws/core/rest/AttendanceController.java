package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IAttendanceControlService;
import com.campusdual.cd2024bfs4g1.api.core.service.IAttendanceService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attendance")
public class AttendanceController extends ORestController<IAttendanceService> {
    @Autowired
    private IAttendanceService attendanceService;

    @Override
    public IAttendanceService getService() {
        return this.attendanceService;
    }
}
