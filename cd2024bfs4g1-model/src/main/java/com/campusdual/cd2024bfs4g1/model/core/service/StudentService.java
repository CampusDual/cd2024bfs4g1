package com.campusdual.cd2024bfs4g1.model.core.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentService;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDao;
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
		return this.daoHelper.query(this.studentDao, keysMap, attributes);
	}

	@Override
	public EntityResult studentInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
		Date startDate = (Date) attrMap.get(studentDao.FCT_START);
		Date finishDate = (Date) attrMap.get(studentDao.FCT_END);

		if (finishDate.before(startDate)) {
			EntityResult error = new EntityResultMapImpl();
			error.setCode(EntityResult.OPERATION_WRONG);
			error.setMessage("END_DATE_MORE_THAN_INIT_DATE");
			return error;
		}

		return this.daoHelper.insert(this.studentDao, attrMap);
	}

	@Override
	public EntityResult studentUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {


			EntityResult query = this.daoHelper.query(this.studentDao, keyMap,
					Arrays.asList(studentDao.FCT_START, studentDao.FCT_END));

			Map<String, Object> mapResult = query.getRecordValues(0);
			Date currentStartDate = (Date) mapResult.get(studentDao.FCT_START);
			Date currentFinishDate = (Date) mapResult.get(studentDao.FCT_END);

			Date newStartDate = (Date) attrMap.getOrDefault(studentDao.FCT_START, currentStartDate);
			Date newFinishDate = (Date) attrMap.getOrDefault(studentDao.FCT_END, currentFinishDate);

			if (newFinishDate.before(newStartDate)) {
				return createErrorResult("END_DATE_MORE_THAN_INIT_DATE");
			}



		return this.daoHelper.update(this.studentDao, attrMap, keyMap);
	}

	@Override
	public EntityResult studentDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
		return this.daoHelper.delete(this.studentDao, keyMap);
	}
	private EntityResult createErrorResult(String message) {
		EntityResult error = new EntityResultMapImpl();
		error.setCode(EntityResult.OPERATION_WRONG);
		error.setMessage(message);
		return error;
	}
}
