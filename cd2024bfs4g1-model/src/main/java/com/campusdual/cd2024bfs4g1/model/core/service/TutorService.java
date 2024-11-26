package com.campusdual.cd2024bfs4g1.model.core.service;
import com.campusdual.cd2024bfs4g1.api.core.service.ITutorService;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorBootcampDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.TutorDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.campusdual.cd2024bfs4g1.api.core.service.IUserAndRoleService;
import com.campusdual.cd2024bfs4g1.model.core.dao.*;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("TutorService")
@Lazy
public class TutorService implements ITutorService {

    @Autowired
    private TutorDao tutorDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private TutorBootcampDao tutorBootcampDao;

    @Autowired
    private IUserAndRoleService userAndRoleService;

    @Autowired
    private UserRoleDao userRoleDao;

    @Autowired
    private RoleDao roleDao;

    @Override
    public EntityResult tutorQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(tutorDao, keyMap, attributes);
    }

    @Override
    public EntityResult tutorInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        String usrLogin = (String) attrMap.remove(UserDao.LOGIN);
        String usrPassword = (String) attrMap.remove(UserDao.PASSWORD);
        //insertar datos alumno
        EntityResult insertTutor = this.daoHelper.insert(this.tutorDao, attrMap);
        if(insertTutor.isWrong()){
            return insertTutor;
        }
        //insertar en caso de null
        if(usrLogin == null && usrPassword == null){
            return insertTutor;
        }
        //crear mapa de atributos para insertar usuario
        Map<String, Object> userAttrMap = new HashMap<>();
        if(usrLogin != null){
            userAttrMap.put(UserDao.LOGIN, usrLogin);
        }
        if(usrPassword != null){
            userAttrMap.put(UserDao.PASSWORD, usrPassword);
        }

        //insertamos usuario
        EntityResult insertUser = userAndRoleService.userInsert(userAttrMap);
        if(insertUser.isWrong()){
            return insertUser;
        }

        Integer userId = (Integer) insertUser.get(UserDao.USR_ID);

        EntityResult assignRoleResult = assignTutorRole(userId);
        if(assignRoleResult.isWrong()){
            return assignRoleResult;
        }

        Map<String, Object> attrTutorUser = new HashMap<>();
        attrTutorUser.put(TutorDao.USER_ID, userId);
        Map<String, Object> keyMap = new HashMap<>();
        keyMap.put(TutorDao.TU_ID, insertTutor.get(TutorDao.TU_ID));

        EntityResult updateTutorWithUser = this.daoHelper.update(this.tutorDao, attrTutorUser, keyMap);
        if(updateTutorWithUser.isWrong()){
            return updateTutorWithUser;
        }
        return insertTutor;
    }

    @Override
    public EntityResult tutorUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        String usrLogin = (String) attrMap.remove(UserDao.LOGIN);
        String usrPassword = (String) attrMap.remove(UserDao.PASSWORD);
        EntityResult updateTutor = this.daoHelper.update(this.tutorDao, attrMap, keyMap);
        if(updateTutor.isWrong()){
            return updateTutor;
        }
        if(usrLogin == null && usrPassword == null){
            return updateTutor;
        }
        //BUSCAMOS EL USUARIO
        List<String> attrTutor = Arrays.asList(TutorDao.USER_ID);
        EntityResult queryTutor = this.daoHelper.query(tutorDao, keyMap, attrTutor);
        if(queryTutor.isWrong() || queryTutor.isEmpty()){
            return queryTutor;
        }
        Integer userId = (Integer) queryTutor.getRecordValues(0).get(TutorDao.USER_ID);
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

            EntityResult userUpdateResult = userAndRoleService.userUpdate(userAttrMap,userKeyMap);
            if(userUpdateResult.isWrong()){
                return userUpdateResult;
            }
            EntityResult assignRoleResult = assignTutorRole(userId);
            if(assignRoleResult.isWrong()){
                return assignRoleResult;
            }
            return userUpdateResult;
        }else{
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

            Map<String, Object> attrTutorUser = new HashMap<>();
            attrTutorUser.put(TutorDao.USER_ID, userId);

            EntityResult updateTutorWithUser = this.daoHelper.update(this.tutorDao, attrTutorUser, keyMap);
            if(updateTutorWithUser.isWrong()){
                return updateTutorWithUser;
            }
            EntityResult assignRoleResult = assignTutorRole(userId);
            if(assignRoleResult.isWrong()){
                return assignRoleResult;
            }
            return updateTutorWithUser;

        }
    }

    private EntityResult assignTutorRole(Integer userId){
        Map<String, Object> roleFilter = new HashMap<>();
        roleFilter.put(RoleDao.ROL_NAME, "tutor");
        List<String> roleColumns = Arrays.asList(RoleDao.ROL_ID);

        EntityResult roleResult = this.daoHelper.query(this.roleDao, roleFilter, roleColumns);
        if(roleResult.isWrong() || roleResult.calculateRecordNumber() == 0){
            return createErrorResult("TUTOR_ROLE_NOT_FOUND");
        }

        Integer roleId = (Integer) roleResult.getRecordValues(0).get(RoleDao.ROL_ID);

        //relacion con usr_user_rol
        Map<String, Object> userRoleMap = new HashMap<>();
        userRoleMap.put(UserDao.USR_ID, userId);
        userRoleMap.put(RoleDao.ROL_ID, roleId);

        return this.daoHelper.insert(this.userRoleDao, userRoleMap);
    }

    @Override
    public EntityResult tutorDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(tutorDao, keyMap);
    }

    private EntityResult createErrorResult(String message) {
        EntityResult error = new EntityResultMapImpl();
        error.setCode(EntityResult.OPERATION_WRONG);
        error.setMessage(message);
        return error;
    }
    @Override
    public AdvancedEntityResult tutorPaginationQuery(final Map<String, Object> keyMap, final List<?> attrList, final int recordNumber, final int startIndex, final List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.tutorDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }
}
