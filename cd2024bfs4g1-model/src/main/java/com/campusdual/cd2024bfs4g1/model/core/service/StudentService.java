package com.campusdual.cd2024bfs4g1.model.core.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
	private NotesDao notesDao;

	@Autowired
	private EmploymentStatusHistoryDao employmentStatusHistoryDao;

	@Autowired
	private UserAndRoleService userAndRoleService;

	@Autowired
	private UserRoleDao userRoleDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private StudentDocumentDao studentDocumentDao;

	@Autowired
	private BootcampDao bootcampDao;

	@Override
	public EntityResult studentQuery(Map<String, Object> keysMap, List<String> attributes) throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.studentDao, keysMap, attributes);
	}

	@Override
	public EntityResult studentMultipleCheckQuery(Map<String, Object> keysMap, List<String> attributes) throws OntimizeJEERuntimeException {
		Map<String, Object> queryMap = new HashMap<>();
		List<Map> students = (List<Map>) keysMap.get("students");
		EntityResult result = new EntityResultMapImpl();

		List<String> errors = new ArrayList<>();

		for (Map student : students) {
			String name = (String) student.get("name");
			if (name != null && name.length() > 255) {
				errors.add("VAL_NAME_MAX_CHAR:" + name);
			}

			String surname1 = (String) student.get("surname1");
			if (surname1 != null && surname1.length() > 255) {
				errors.add("VAL_SURNAME1_MAX_CHAR:" + name);
			}

			String surname2 = (String) student.get("surname2");
			if (surname2 != null && surname2.length() > 255) {
				errors.add("VAL_SURNAME2_MAX_CHAR:" + surname2);
			}

			String dni = (String) student.get("dni");
			if (dni != null) {

				if (dni.length() > 9) {
					errors.add("VAL_DNI_MAX_CHAR:" + dni);
				} else {
					String dniPattern = "^[0-9]{8}[A-Za-z]$";
					String nifPattern = "^[A-HJ-NP-S]{1}[0-9]{8}$";
					Pattern dniRegex = Pattern.compile(dniPattern);
					Matcher dniMatcher = dniRegex.matcher(dni);
					Pattern nifRegex = Pattern.compile(nifPattern);
					Matcher nifMatcher = nifRegex.matcher(dni);

					if (!dniMatcher.matches() && !nifMatcher.matches()) {
						errors.add("VAL_DNI_OR_NIF_INVALID_FORMAT:" + dni);
					}
				}
			}

			String personal_email = (String) student.get("personal_email");
			if (personal_email != null) {
				if (personal_email.length() > 255) {
					errors.add("VAL_PERSONAL_EMAIL_MAX_CHAR:" + personal_email );
				}
				if (!personal_email.matches("^[\\p{L}\\p{N}.%+-]+@[\\p{L}\\p{N}.-]+\\.[a-zA-Z]{2,}$")) {
					errors.add("VAL_PERSONAL_EMAIL_FORMAT_NOT_VALID:" + personal_email);
				}
			}

			String campus_email = (String) student.get("campus_email");
			if (campus_email != null) {
				if (campus_email.length() > 255) {
					errors.add("VAL_CAMPUS_EMAIL_MAX_CHAR:" + campus_email );
				}
				if (!campus_email.matches("^[\\p{L}\\p{N}.%+-]+@[\\p{L}\\p{N}.-]+\\.[a-zA-Z]{2,}$")) {
					errors.add("VAL_CAMPUS_EMAIL_FORMAT_NOT_VALID:" + campus_email);
				}
			}

			String location = (String) student.get("location");
			if (location != null && location.length() > 20) {
				errors.add("VAL_LOCATION_MAX_CHAR:" + location );
			}

			String phone = (String) student.get("phone");
			if (phone != null) {
				if (phone.length() > 20) {
					errors.add("VAL_PHONE_MAX_CHAR:" + phone );
				}
				if (!phone.matches("^\\+\\d{1,4}\\s?\\d{6,15}$")) {
					errors.add("VAL_PHONE_FORMAT_NOT_VALID:" + phone );
				}
			}

			List<String> spainComunitys = Arrays.asList(
					"Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
					"Castilla La Mancha", "Castilla y León", "Cataluña", "Comunidad Valenciana",
					"Euskadi", "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra",
					"La Rioja", "Ceuta", "Melilla", "Others"
			);


				String spain_comunity = (String) student.get("spain_comunity");
				if (spain_comunity != null) {
					if (spain_comunity.length() > 30) {
						errors.add("VAL_SPAIN_COMUNITY_MAX_CHAR:" + spain_comunity );
					} else if (!spainComunitys.contains(spain_comunity)) {
						errors.add("VAL_SPAIN_COMUNITY_NOT_VALID:" + spain_comunity);
					}
				}

			String birthDate = (String) student.get("birth_date");
			if (birthDate != null) {
				try {
					LocalDate.parse(birthDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
				} catch (DateTimeParseException e) {
					errors.add("VAL_BIRTH_DATE_FORMAT_NOT_VALID:" + birthDate);
				}
			}
		}

		if (errors.size() > 0) {
			return new EntityResultMapImpl() {{
				put("errors", errors);
			}};
		}

		for (Map student : students) {
			String dni = (String) student.get("dni");

			if (dni != null) {
				queryMap.put(StudentDao.DNI, dni);
				EntityResult queryResult = this.daoHelper.query(this.studentDao, queryMap, Arrays.asList(StudentDao.STU_ID));

				if (!queryResult.isEmpty()) {
					result.addRecord(student);
				}
			}
		}

		return result;
	}



	@Override
	public EntityResult studentCsvInsert(Map<String, Object> keysMap) throws OntimizeJEERuntimeException {
		EntityResult insertResult = new EntityResultMapImpl();
		List<Map<String, Object>> students = (List<Map<String, Object>>) keysMap.get("students");

		if (students == null || students.isEmpty()) {
			insertResult.setCode(EntityResult.OPERATION_WRONG);
			insertResult.setMessage("No students data provided for insertion.");
			return insertResult;
		}

		for (Map<String, Object> student : students) {
			try {

				if (!student.containsKey("udemy")) {
					student.put("udemy", false);
				}

				String bootcampCode = (String) student.get("codigo");
				Map<String, Object> queryMap = new HashMap<>();
				queryMap.put(bootcampDao.ATTR_CODIGO, bootcampCode);
				EntityResult result = this.daoHelper.query(
						this.bootcampDao,
						queryMap,
						Arrays.asList(bootcampDao.ATTR_CODIGO, bootcampDao.ATTR_ID, bootcampDao.ATTR_START_DATE,bootcampDao.ATTR_FINISH_DATE)
				);

				if(!result.isEmpty() ) {

					Map<String,Object> idMap = result.getRecordValues(0);
					Object bootcamp_id = idMap.get("id");
					Object start_date = idMap.get("start_date");
					Object end_date = idMap.get("end_date");


					EntityResult singleInsertResult = this.daoHelper.insert(this.studentDao, student);

					if (singleInsertResult.getCode() == EntityResult.OPERATION_SUCCESSFUL) {
						insertResult.addRecord(student);
						int student_id = (Integer) singleInsertResult.get("id");


						Map<String, Object> bootcampAssigned = new HashMap<>();
						bootcampAssigned.put("student_id", student_id);
						bootcampAssigned.put("bootcamp_id", bootcamp_id);
						bootcampAssigned.put("start_date", start_date);
						bootcampAssigned.put("end_date", end_date);



						EntityResult singleInsertResultStudentBootcamps = this.daoHelper.insert(this.studentBootcampDao, bootcampAssigned);
					} else {
						insertResult.setCode(EntityResult.OPERATION_WRONG);
						insertResult.setMessage("Error inserting some records.");
					}

				}else {
					EntityResult singleInsertResult = this.daoHelper.insert(this.studentDao, student);

					if (singleInsertResult.getCode() == EntityResult.OPERATION_SUCCESSFUL) {
						insertResult.addRecord(student);
					} else {
						insertResult.setCode(EntityResult.OPERATION_WRONG);
						insertResult.setMessage("Error inserting some records.");
					}

				}
			} catch (Exception e) {
				insertResult.setCode(EntityResult.OPERATION_WRONG);
				insertResult.setMessage("Error inserting student: " + e.getMessage());
			}
		}

		return insertResult;
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

		Map<String, Object> userKeyMap2 = new HashMap<>();
		if(usrLogin != null) {
			userKeyMap2.put(UserDao.LOGIN, usrLogin);

			EntityResult queryUser = this.daoHelper.query(userDao, userKeyMap2, Arrays.asList(UserDao.USR_ID));
			if (!queryUser.isEmpty()) {
				return createErrorResult("DUPLICATED_USRLOGIN_NAME");
			}
		}


		EntityResult insertStudent = this.daoHelper.insert(this.studentDao, attrMap);
		if(insertStudent.isWrong()){
			return insertStudent;
		}

		if(usrLogin == null && usrPassword == null && usrPhoto == null){
			return insertStudent;
		}

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


		EntityResult insertUser = userAndRoleService.userInsert(userAttrMap);
		if(insertUser.isWrong()){
			return insertUser;
		}


		Integer userId = (Integer) insertUser.get(UserDao.USR_ID);


		EntityResult assignRoleResult = assignStudentRole(userId);
		if(assignRoleResult.isWrong()){
			return assignRoleResult;
		}


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


		EntityResult query = this.daoHelper.query(this.studentDao, keyMap,
				Arrays.asList(StudentDao.FCT_START, StudentDao.FCT_END));
		Map<String, Object> mapResult = query.getRecordValues(0);


		if (attrMap.get(StudentDao.FCT_START) != null && attrMap.get(StudentDao.FCT_END) != null) {
			Date currentStartDate = (Date) mapResult.get(StudentDao.FCT_START);
			Date currentFinishDate = (Date) mapResult.get(StudentDao.FCT_END);
			Date newStartDate = (Date) attrMap.getOrDefault(StudentDao.FCT_START, currentStartDate);
			Date newFinishDate = (Date) attrMap.getOrDefault(StudentDao.FCT_END, currentFinishDate);

			if (newFinishDate.before(newStartDate)) {
				return createErrorResult("END_DATE_MORE_THAN_INIT_DATE");
			}
		}


		String usrLogin = (String) attrMap.remove(UserDao.LOGIN);
		String usrPassword = (String) attrMap.remove(UserDao.PASSWORD);
		Object usrPhoto = attrMap.remove(UserDao.PHOTO);
		Map<String, Object> userKeyMap2 = new HashMap<>();
		if(usrLogin != null) {
			userKeyMap2.put(UserDao.LOGIN, usrLogin);

			EntityResult queryUser = this.daoHelper.query(userDao, userKeyMap2, Arrays.asList(UserDao.USR_ID));
			if (!queryUser.isEmpty()) {
				return createErrorResult("DUPLICATED_USRLOGIN_NAME");
			}
		}
		if (usrPhoto != null && usrPhoto.equals("")) {
			usrPhoto = null;
		}


		if (attrMap.get(StudentDao.TUTOR) instanceof NullValue) {
			attrMap.put(StudentDao.TUTOR, new NullValue(4));
		}

		EntityResult updateStudent = this.daoHelper.update(this.studentDao, attrMap, keyMap);
		if (updateStudent.isWrong()) {
			return updateStudent;
		}


		if (usrLogin == null && usrPassword == null && usrPhoto == null) {
			return updateStudent;
		}


		List<String> attrStudent = Arrays.asList(StudentDao.USER_ID);
		EntityResult queryStudent = this.daoHelper.query(studentDao, keyMap, attrStudent);
		if (queryStudent.isWrong() || queryStudent.isEmpty()) {
			return queryStudent;
		}
		Integer userId = (Integer) queryStudent.getRecordValues(0).get(StudentDao.USER_ID);


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
			return userUpdateResult;
		} else {

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


			Map<String, Object> attrStudentUser = new HashMap<>();
			attrStudentUser.put(StudentDao.USER_ID, userId);

			EntityResult updateStudentWithUser = this.daoHelper.update(this.studentDao, attrStudentUser, keyMap);
			if (updateStudentWithUser.isWrong()) {
				return updateStudentWithUser;
			}


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
		Map<String,Object> deletekey2 = new Hashtable<>();
		deletekey2.put(NotesDao.ATTR_ID_STUDENTS,keyMap.get(StudentDao.STU_ID));
		EntityResult query2 = this.daoHelper.query(this.notesDao,deletekey2,Arrays.asList(NotesDao.ATTR_ID_STUDENTS));
		Map<String,Object> deletekey3 = new Hashtable<>();
		deletekey3.put(EmploymentStatusHistoryDao.ATTR_STUDENT_ID,keyMap.get(StudentDao.STU_ID));
		EntityResult query3 = this.daoHelper.query(this.employmentStatusHistoryDao,deletekey3,Arrays.asList(EmploymentStatusHistoryDao.ATTR_STUDENT_ID));
		Map<String,Object> deletekey4 = new Hashtable<>();
		deletekey4.put(StudentDocumentDao.ATTR_ID_STUDENT,keyMap.get(StudentDao.STU_ID));
		EntityResult query4 = this.daoHelper.query(this.studentDocumentDao,deletekey4,Arrays.asList(StudentDocumentDao.ATTR_ID_STUDENT));


		if(!query.isEmpty()){
			EntityResult error = new EntityResultMapImpl();
			error.setCode(EntityResult.OPERATION_WRONG);
			error.setMessage("STUDENT_HAS_BOOTCAMPS");
			return error;
		} else if(!query2.isEmpty()){
			EntityResult error2 = new EntityResultMapImpl();
			error2.setCode(EntityResult.OPERATION_WRONG);
			error2.setMessage("STUDENT_HAS_NOTES");
			return error2;
		}else if(!query3.isEmpty()){
			EntityResult error3 = new EntityResultMapImpl();
			error3.setCode(EntityResult.OPERATION_WRONG);
			error3.setMessage("STUDENT_HAS_STATUS");
			return error3;
		}else if(!query4.isEmpty()){
			EntityResult error4 = new EntityResultMapImpl();
			error4.setCode(EntityResult.OPERATION_WRONG);
			error4.setMessage("STUDENT_HAS_DOCUMENTS");
			return error4;
		}else {
			EntityResult studentQuery = this.daoHelper.query(this.studentDao, keyMap, Arrays.asList(StudentDao.USER_ID));
			List<?> userIdList = (List<?>) studentQuery.get(StudentDao.USER_ID);
			if (userIdList != null && !userIdList.isEmpty()) {
				Object userId = userIdList.get(0);

				if (userId != null) {
					Map<String, Object> userKey = new Hashtable<>();

					userKey.put(UserDao.USR_ID, userId);
					this.daoHelper.delete(this.studentDao,keyMap);
					return userAndRoleService.userDelete(userKey);
				}
			}
			return this.daoHelper.delete(this.studentDao, keyMap);
		}
	}

	private EntityResult assignStudentRole(Integer userId){

		Map<String, Object> roleFilter = new HashMap<>();
		roleFilter.put(RoleDao.ROL_NAME, "student");
		List<String> roleColumns = Arrays.asList(RoleDao.ROL_ID);

		EntityResult roleResult = this.daoHelper.query(this.roleDao, roleFilter, roleColumns);
		if(roleResult.isWrong() || roleResult.calculateRecordNumber() == 0){
			return createErrorResult("STUDENT_ROLE_NOT_FOUND");
		}

		Integer roleId = (Integer) roleResult.getRecordValues(0).get(RoleDao.ROL_ID);


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

	@Override
	public EntityResult commercialStudentQuery(Map<String, Object> keysMap, List<String> attributes) throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.studentDao, keysMap, attributes, "commercialStudent");
	}

	@Override
	public AdvancedEntityResult commercialStudentPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
		return this.daoHelper.paginationQuery(this.studentDao, keyMap, attrList, recordNumber, startIndex, orderBy, "commercialStudent");
	}
}
