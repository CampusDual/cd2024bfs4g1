package com.campusdual.cd2024bfs4g1.model.core.service;

import java.util.*;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentService;
import com.campusdual.cd2024bfs4g1.api.core.service.IUserAndRoleService;
import com.campusdual.cd2024bfs4g1.model.core.dao.*;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;

import javax.swing.text.html.parser.Entity;

@Service("StudentService")
@Lazy
public class StudentService implements IStudentService {

	@Autowired
	private StudentDao studentDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	@Autowired
	private StudentBootcampDao studentBootcampDao;

	@Autowired
	private IUserAndRoleService userAndRoleService;

	@Override
	public EntityResult studentQuery(Map<String, Object> keysMap, List<String> attributes) throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.studentDao, keysMap, attributes);
	}

	@Override
	public EntityResult studentInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
if((attrMap.get(studentDao.FCT_START) != null) && attrMap.get(studentDao.FCT_END) != null) {
	Date startDate = (Date) attrMap.get(studentDao.FCT_START);
	Date finishDate = (Date) attrMap.get(studentDao.FCT_END);
	if (finishDate.before(startDate)) {
		EntityResult error = new EntityResultMapImpl();
		error.setCode(EntityResult.OPERATION_WRONG);
		error.setMessage("END_DATE_MORE_THAN_INIT_DATE");
		return error;
	}
}
		return this.daoHelper.insert(this.studentDao, attrMap);
	}

	@Override
	public EntityResult studentUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {


			EntityResult query = this.daoHelper.query(this.studentDao, keyMap,
					Arrays.asList(studentDao.FCT_START, studentDao.FCT_END));

			Map<String, Object> mapResult = query.getRecordValues(0);

		if((attrMap.get(studentDao.FCT_START) != null) && attrMap.get(studentDao.FCT_END) != null) {

			Date currentStartDate = (Date) mapResult.get(studentDao.FCT_START);
			Date currentFinishDate = (Date) mapResult.get(studentDao.FCT_END);

			Date newStartDate = (Date) attrMap.getOrDefault(studentDao.FCT_START, currentStartDate);
			Date newFinishDate = (Date) attrMap.getOrDefault(studentDao.FCT_END, currentFinishDate);

			if (newFinishDate.before(newStartDate)) {
				return createErrorResult("END_DATE_MORE_THAN_INIT_DATE");
			}
		}

		String usrLogin = (String) attrMap.remove(UserDao.LOGIN);
		String usrPassword = (String) attrMap.remove(UserDao.PASSWORD);
		//ACTUALIZAMOS SOLO LOS DATOS DEL ESTUDIANTE
		EntityResult updateStudent = this.daoHelper.update(this.studentDao, attrMap, keyMap);
		if(updateStudent.isWrong()){
			return updateStudent;
		}
		//ACTUALIZAMOS LOS DATOS DEL USUARIO si hay cambios en el usuario
		if(usrLogin == null && usrPassword == null){
			return updateStudent;
		}
		//BUSCAMOS EL USUARIO
		List<String> attrStudent = Arrays.asList(StudentDao.USER_ID);
		EntityResult queryStudent = this.daoHelper.query(studentDao, keyMap, attrStudent);
		if(queryStudent.isWrong() || queryStudent.isEmpty()){
			return queryStudent;
		}
		Integer userId = (Integer) queryStudent.getRecordValues(0).get(StudentDao.USER_ID);
		//SI LO ENCONTRAMOS LO ACTUALIZAMOS
		if(userId != null){
			Map<String, Object> userAttrMap = new HashMap<>();
			if(usrLogin != null){
				userAttrMap.put(UserDao.LOGIN, usrLogin);
			}
			if(usrPassword != null){
				userAttrMap.put(UserDao.PASSWORD, usrPassword);
			}
			Map<String, Object> userKeyMap = new HashMap<>();
			userKeyMap.put(UserDao.USR_ID, userId);

			return userAndRoleService.userUpdate(userAttrMap, userKeyMap);



		}else{
			//SI NO SE ENCUENTRA SE INSERTA
			Map<String, Object> userAttrMap = new HashMap<>();
			if(usrLogin != null){
				userAttrMap.put(UserDao.LOGIN, usrLogin);
			}
			if(usrPassword != null){
				userAttrMap.put(UserDao.PASSWORD, usrPassword);
			}

			EntityResult insertUser = userAndRoleService.userInsert(userAttrMap);

			if(insertUser.isWrong()){
				return insertUser;
			}
			userId = (Integer) insertUser.get(UserDao.USR_ID);
			Map<String, Object> attrStudentUser = new HashMap<>();
			attrStudentUser.put(StudentDao.USER_ID, userId);
			return this.daoHelper.update(this.studentDao, attrStudentUser, keyMap);

		}


	}

	@Override
	public EntityResult studentDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
		Map<String,Object> deletekey = new Hashtable<>();
		deletekey.put(StudentBootcampDao.STUDENT_ID,keyMap.get(StudentDao.STU_ID));
		EntityResult query = this.daoHelper.query(this.studentBootcampDao,deletekey,Arrays.asList(StudentBootcampDao.STUDENT_ID));


		if(!query.isEmpty()){
			EntityResult error = new EntityResultMapImpl();
			error.setCode(EntityResult.OPERATION_WRONG);
			error.setMessage("STUDENT_HAS_BOOTCAMPS");
			return error;
		}else {
			return this.daoHelper.delete(this.studentDao, keyMap);
		}

	}
	private EntityResult createErrorResult(String message) {
		EntityResult error = new EntityResultMapImpl();
		error.setCode(EntityResult.OPERATION_WRONG);
		error.setMessage(message);
		return error;
	}
}
