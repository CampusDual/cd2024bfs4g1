package com.campusdual.cd2024bfs4g1.ws.core.rest;


import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/StudentBootcamp")
public class StudentBootcampRestController extends ORestController<IStudentBootcampService> {

    @Autowired
    private IStudentBootcampService studentBootcampService;

    @Override
    public IStudentBootcampService getService() {
        return this.studentBootcampService;
    }


}
