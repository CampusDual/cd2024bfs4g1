package com.campusdual.cd2024bfs4g1.model.core.service;

import java.util.*;

import com.campusdual.cd2024bfs4g1.api.core.service.IStudentService;
import com.campusdual.cd2024bfs4g1.api.core.service.IUserAndRoleService;
import com.campusdual.cd2024bfs4g1.model.core.dao.*;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.db.NullValue;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

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

	@Autowired
	private UserRoleDao userRoleDao;

	@Autowired
	private RoleDao roleDao;

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
		String usrLogin = (String) attrMap.remove(UserDao.LOGIN);
		String usrPassword = (String) attrMap.remove(UserDao.PASSWORD);
		String usrPhoto = (String) attrMap.remove(UserDao.PHOTO);
		//insertar datos alumno
		EntityResult insertStudent = this.daoHelper.insert(this.studentDao, attrMap);
		if(insertStudent.isWrong()){
			return insertStudent;
		}
		//insertar en caso de null
		if(usrLogin == null && usrPassword == null && usrPhoto == null){
			return insertStudent;
		}
		//crear mapa de atributos para insertar usuario
		Map<String, Object> userAttrMap = new HashMap<>();
		if(usrLogin != null){
			userAttrMap.put(UserDao.LOGIN, usrLogin);
		}
		if(usrPassword != null){
			userAttrMap.put(UserDao.PASSWORD, usrPassword);
		}
		if(usrPhoto != null){
			userAttrMap.put(UserDao.PHOTO,usrPhoto);
		}

		//insertamos usuario
		EntityResult insertUser = userAndRoleService.userInsert(userAttrMap);
		if(insertUser.isWrong()){
			return insertUser;
		}

		//obtener id del usuario insertado
		Integer userId = (Integer) insertUser.get(UserDao.USR_ID);

		//asignar rol de estudiante al usuario
		EntityResult assignRoleResult = assignStudentRole(userId);
		if(assignRoleResult.isWrong()){
			return assignRoleResult;
		}

		//actualizar tabla estudiantes con id usuario
		Map<String, Object> attrStudentUser = new HashMap<>();
		attrStudentUser.put(StudentDao.USER_ID, userId);
		Map<String, Object> keyMap = new HashMap<>();
		keyMap.put(StudentDao.STU_ID, insertStudent.get(StudentDao.STU_ID));

		EntityResult updateStudentWithUser = this.daoHelper.update(this.studentDao, attrStudentUser, keyMap);
		if(updateStudentWithUser.isWrong()){
			return updateStudentWithUser;
		}
		return insertStudent;

	}

	@Override
	public EntityResult studentUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {

		// Consultar las fechas de inicio y fin actuales
		EntityResult query = this.daoHelper.query(this.studentDao, keyMap,
				Arrays.asList(StudentDao.FCT_START, StudentDao.FCT_END));
		Map<String, Object> mapResult = query.getRecordValues(0);

		// Validar las fechas de inicio y fin si están presentes en los atributos
		if (attrMap.get(StudentDao.FCT_START) != null && attrMap.get(StudentDao.FCT_END) != null) {
			Date currentStartDate = (Date) mapResult.get(StudentDao.FCT_START);
			Date currentFinishDate = (Date) mapResult.get(StudentDao.FCT_END);
			Date newStartDate = (Date) attrMap.getOrDefault(StudentDao.FCT_START, currentStartDate);
			Date newFinishDate = (Date) attrMap.getOrDefault(StudentDao.FCT_END, currentFinishDate);

			if (newFinishDate.before(newStartDate)) {
				return createErrorResult("END_DATE_MORE_THAN_INIT_DATE");
			}
		}

		// Manejar los datos del usuario
		String usrLogin = (String) attrMap.remove(UserDao.LOGIN);
		String usrPassword = (String) attrMap.remove(UserDao.PASSWORD);
		Object usrPhoto = attrMap.remove(UserDao.PHOTO);
		if (usrPhoto != null && usrPhoto.equals("")) {
			usrPhoto = null;
		}

		// Actualizar los datos del estudiante
		EntityResult updateStudent = this.daoHelper.update(this.studentDao, attrMap, keyMap);
		if (updateStudent.isWrong()) {
			return updateStudent;
		}

		// Actualizar los datos del usuario si hay cambios
		if (usrLogin == null && usrPassword == null && usrPhoto == null) {
			return updateStudent;
		}

		// Consultar el ID del usuario asociado al estudiante
		List<String> attrStudent = Arrays.asList(StudentDao.USER_ID);
		EntityResult queryStudent = this.daoHelper.query(studentDao, keyMap, attrStudent);
		if (queryStudent.isWrong() || queryStudent.isEmpty()) {
			return queryStudent;
		}
		Integer userId = (Integer) queryStudent.getRecordValues(0).get(StudentDao.USER_ID);

		// Si el usuario existe, actualizar los datos del usuario
		if (userId != null) {
			Map<String, Object> userAttrMap = new HashMap<>();
			if (usrLogin != null) {
				userAttrMap.put(UserDao.LOGIN, usrLogin);
			}
			if (usrPassword != null) {
				userAttrMap.put(UserDao.PASSWORD, usrPassword);
			}
			if (usrPhoto != null) {
				userAttrMap.put(UserDao.PHOTO, usrPhoto);
			}
			Map<String, Object> userKeyMap = new HashMap<>();
			userKeyMap.put(UserDao.USR_ID, userId);

			EntityResult userUpdateResult = userAndRoleService.userUpdate(userAttrMap, userKeyMap);
			if (userUpdateResult.isWrong()) {
				return userUpdateResult;
			}

			// Asignar rol de estudiante al usuario
			EntityResult assignRoleResult = assignStudentRole(userId);
			if (assignRoleResult.isWrong()) {
				return assignRoleResult;
			}
			return userUpdateResult;
		} else {
			// Si el usuario no existe, insertar un nuevo usuario
			Map<String, Object> userAttrMap = new HashMap<>();
			if (usrLogin != null) {
				userAttrMap.put(UserDao.LOGIN, usrLogin);
			}
			if (usrPassword != null) {
				userAttrMap.put(UserDao.PASSWORD, usrPassword);
			}
			if (usrPhoto != null) {
				userAttrMap.put(UserDao.PHOTO, usrPhoto);
			}

			EntityResult insertUser = userAndRoleService.userInsert(userAttrMap);
			if (insertUser.isWrong()) {
				return insertUser;
			}
			userId = (Integer) insertUser.get(UserDao.USR_ID);

			// Actualizar la tabla estudiantes con el ID del usuario
			Map<String, Object> attrStudentUser = new HashMap<>();
			attrStudentUser.put(StudentDao.USER_ID, userId);

			EntityResult updateStudentWithUser = this.daoHelper.update(this.studentDao, attrStudentUser, keyMap);
			if (updateStudentWithUser.isWrong()) {
				return updateStudentWithUser;
			}

			// Asignar rol de estudiante al usuario
			EntityResult assignRoleResult = assignStudentRole(userId);
			if (assignRoleResult.isWrong()) {
				return assignRoleResult;
			}

			return updateStudentWithUser;
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

	private EntityResult assignStudentRole(Integer userId){
		//ir a tabla roles para conseguir rol de estudiante
		Map<String, Object> roleFilter = new HashMap<>();
		roleFilter.put(RoleDao.ROL_NAME, "student");
		List<String> roleColumns = Arrays.asList(RoleDao.ROL_ID);

		EntityResult roleResult = this.daoHelper.query(this.roleDao, roleFilter, roleColumns);
		if(roleResult.isWrong() || roleResult.calculateRecordNumber() == 0){
			return createErrorResult("STUDENT_ROLE_NOT_FOUND");
		}

		Integer roleId = (Integer) roleResult.getRecordValues(0).get(RoleDao.ROL_ID);

		//relacion con usr_user_rol
		Map<String, Object> userRoleMap = new HashMap<>();
		userRoleMap.put(UserDao.USR_ID, userId);
		userRoleMap.put(RoleDao.ROL_ID, roleId);

		return this.daoHelper.insert(this.userRoleDao, userRoleMap);
	}

	private EntityResult createErrorResult(String message) {
		EntityResult error = new EntityResultMapImpl();
		error.setCode(EntityResult.OPERATION_WRONG);
		error.setMessage(message);
		return error;
	}

	@Override
	public AdvancedEntityResult studentPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
		return this.daoHelper.paginationQuery(this.studentDao, keyMap, attrList, recordNumber, startIndex, orderBy);
	}
}
