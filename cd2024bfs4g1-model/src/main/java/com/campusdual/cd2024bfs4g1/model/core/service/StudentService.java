package com.campusdual.cd2024bfs4g1.model.core.service;

import java.util.List;
import java.util.Map;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;

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

	@Override
	public EntityResult studentInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {

/*
		String dni = (String) attrMap.get(StudentDao.DNI);
		EntityResult error = new EntityResultMapImpl();
		error.setCode(EntityResult.OPERATION_WRONG);

		if (dni == null || !dni.matches("\\d{8}[A-Z]")) {
			error.setMessage("DNI_INVALID_FORMAT");
			return error;
		}
		String numbers = dni.substring(0, 8);
		char letter = dni.charAt(8);

		int number = Integer.parseInt(numbers);
		char[] letters = {'T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D',
				'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'};
		char calculatedLetter = letters[number % 23];
		if (calculatedLetter != letter) {
			error.setMessage("DNI_INVALID_LETTER");
			return error;
		}*/
		return this.daoHelper.insert(this.studentDao, attrMap);

	}

	@Override
	public EntityResult studentUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
		return this.daoHelper.update(this.studentDao, attrMap, keyMap);
	}

	@Override
	public EntityResult studentDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
		return this.daoHelper.delete(this.studentDao, keyMap);
	}
}
