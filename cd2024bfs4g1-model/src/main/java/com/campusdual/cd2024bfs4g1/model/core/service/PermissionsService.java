package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService;
import com.campusdual.cd2024bfs4g1.model.core.dao.MenuDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * The type Permissions service.
 */
@Service("PermissionsService")
@Lazy
public class PermissionsService implements IPermissionsService {

    public static final String PERMISSION = "permission";
    public static final String MENU = "menu";
    public static final String ROUTES = "routes";
    @Autowired
    private MenuDao menuDao;

    @Autowired
    private RoutesDao routeDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult permissionQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        EntityResult result = new EntityResultMapImpl();
        Map<String,Object> permissions = new HashMap<>();
        //add the permissions of menu
        addMenuToPermission(permissions);
        //add the permissions of the route
        /*addRouteToPermission(permissions);*/
        Map<String,Object> hResult = new HashMap<>();
        hResult.put(PERMISSION,castMapToStringJson(permissions));
        result.addRecord(hResult);
        return(result);
    }

    /**
     * Cast a Map to a String with Json structure.
     *
     * @param map the map
     * @return String with JSON estructure
     */
    private String castMapToStringJson(Map<String,Object> map){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Add the menu permissions to the permission map result.
     *
     * @param permissions the permision map where insert the menu permissions
     */
    private void addMenuToPermission(Map<String, Object> permissions) {
        List columns = Arrays.asList(MenuDao.ATTR_ATTR,MenuDao.ATTR_VISIBLE,MenuDao.ATTR_ENABLED);
        Map<String,Object> keys = new HashMap<>();
        keys.put(MenuDao.ATTR_ROLENAME,getRole());
        EntityResult menuPermisions = this.daoHelper.query(menuDao,keys,columns);
        if(menuPermisions.calculateRecordNumber()>0){
            List menuPermissionsList = new ArrayList();
            for(int i=0; i< menuPermisions.calculateRecordNumber();i++){
                menuPermissionsList.add(switchToLower(menuPermisions.getRecordValues(i)));
            }
            permissions.put(MENU,menuPermissionsList);
        }
    }

    /**
     * Add the route permissions to the permission map result.
     *
     * @param permissions the permision map where insert the route permissions
     */
    private void addRouteToPermission(Map<String, Object> permissions) {
        List columns = Arrays.asList(RoutesDao.ATTR_PERMISSIONID, RoutesDao.ATTR_ENABLED);
        Map<String,Object> keys = new HashMap<>();
        keys.put(RoutesDao.ATTR_ROLENAME,getRole());
        EntityResult routePermisions = this.daoHelper.query(routeDao,keys,columns);
        if(routePermisions.calculateRecordNumber()>0){
            List routePermissionsList = new ArrayList();
            for(int i=0; i< routePermisions.calculateRecordNumber();i++){
                routePermissionsList.add(switchToLower(routePermisions.getRecordValues(i)));
            }
            permissions.put(ROUTES,routePermissionsList);
        }
    }

    /**
     * controls the case of the keys in the permission map.
     *
     * @param map the permision map wherereview the keys
     */
    private Map<String, Object>  switchToLower(Map<String,Object> map){
        Map<String,Object> result = new HashMap<>();
        map.forEach((k,v) -> {
            if("permissionid".equalsIgnoreCase(k.toLowerCase())){
                result.put("permissionId",v);
            }else{
                result.put(k.toLowerCase(),v);
            }
        });
        return result;
    }

    /**
     * Return the role of the user.
     *
     * @return String with name of the role
     */
    private String getRole(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().toArray()[0].toString();
    }
}
