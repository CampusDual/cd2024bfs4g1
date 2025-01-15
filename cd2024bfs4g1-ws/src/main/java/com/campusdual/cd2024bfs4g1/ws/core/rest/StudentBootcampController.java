package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentBootcampService;
import com.campusdual.cd2024bfs4g1.model.core.service.StudentBootcampService;
import com.ontimize.jee.common.dto.EntityResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.ontimize.jee.server.rest.ORestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/studentbootcamp")
public class StudentBootcampController extends ORestController<IStudentBootcampService>{

    @Autowired
    private IStudentBootcampService studentBootcampSrv;

    @Override
    public IStudentBootcampService getService() {
        return this.studentBootcampSrv;
    }

    @Autowired
    private IStudentBootcampService studentBootcampService;


    @PostMapping("/with-computable")
    public ResponseEntity<?> getStudentsWithComputable(@RequestBody Map<String, Object> filter) {
        try {
            List<String> columns = List.of("student_id", "name", "surname1", "surname2", "computable");
            EntityResult result = studentBootcampService.studentsWithComputableQuery(filter, columns);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
