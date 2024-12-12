package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IAttendanceControlService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attendance_status")
public class AttendanceControlController extends ORestController<IAttendanceControlService> {

    @Autowired
    private IAttendanceControlService attendanceControlService;

    @Override
    public IAttendanceControlService getService() {
        return this.attendanceControlService;
    }
}
