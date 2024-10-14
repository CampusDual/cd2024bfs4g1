package com.campusdual.cd2024bfs4g1.model.core.service;

import java.util.List;
import java.util.Map;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service("StudentService")
@Lazy
public class StudentService implements IStudentService {

	@Autowired
	private StudentDao studentDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	@Override
	public EntityResult studentQuery(Map<String, Object> keysMap, List<String> attributes) throws OntimizeJEERuntimeException {
		// Query the StudentDao for all students
		return this.daoHelper.query(this.studentDao, keysMap, attributes);
	}
}
