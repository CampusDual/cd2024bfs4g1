package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IPermissionsService;
import com.campusdual.cd2024bfs4g1.model.core.dao.MenuDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.RoutesDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.common.gui.SearchValue;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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
    private RoutesDao routesDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult permissionQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        EntityResult result = new EntityResultMapImpl();
        Map<String,Object> permissions = new HashMap<>();
        //add the permissions of menu
        addMenuToPermission(permissions);
        //add the permissions of the route
        addRouteToPermission(permissions);
        Map<String,Object> hResult = new HashMap<>();
        hResult.put(PERMISSION,castMapToStringJson(permissions));
        result.addRecord(hResult);
        return(result);
    }

    @Override
    public EntityResult menuQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.menuDao, keyMap, attrList);
    }

    @Override
    public EntityResult menuInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.menuDao,attrMap);
    }

    @Override
    public EntityResult menuUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.menuDao,attrMap,keyMap);
    }

    @Override
    public EntityResult menuDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.menuDao,keyMap);
    }

    @Override
    public EntityResult routeQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.routesDao, keyMap, attrList);
    }

    @Override
    public EntityResult routeInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.routesDao,attrMap);
    }

    @Override
    public EntityResult routeUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.routesDao,attrMap,keyMap);
    }

    @Override
    public EntityResult routeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.routesDao,keyMap);
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
        keys.put(MenuDao.ATTR_ROLENAME,new SearchValue(SearchValue.IN,getRoles()));
        EntityResult menuPermissions = this.daoHelper.query(menuDao,keys,columns);
        if(menuPermissions.calculateRecordNumber()>0){
            Map<String,Map<String, Object>> menuPermissionsMap = new HashMap<>();
            for(int i=0; i< menuPermissions.calculateRecordNumber();i++){
                Map<String,Object> permission = switchToLower(menuPermissions.getRecordValues(i));
                Map<String,Object> existingPermission = menuPermissionsMap.get(permission.get("attr"));
                if(existingPermission == null){
                    menuPermissionsMap.put((String) permission.get("attr"),permission);
                }else{
                    if((Boolean) permission.get("enabled")){
                        existingPermission.put("enabled",true);
                    }
                    if((Boolean) permission.get("visible")){
                        existingPermission.put("visible",true);
                    }
                }
            }
            permissions.put(MENU,menuPermissionsMap.values());
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
        keys.put(RoutesDao.ATTR_ROLENAME,new SearchValue(SearchValue.IN,getRoles()));
        EntityResult routePermisions = this.daoHelper.query(routesDao,keys,columns);
        if(routePermisions.calculateRecordNumber()>0){
            Map<String,Map<String, Object>>  routePermissionsMap = new HashMap<>();
            for(int i=0; i< routePermisions.calculateRecordNumber();i++){
                Map<String,Object> permission = switchToLower(routePermisions.getRecordValues(i));
                Map<String,Object> existingPermission = routePermissionsMap.get(permission.get("permissionId"));
                if(existingPermission == null){
                    routePermissionsMap.put((String) permission.get("permissionId"),permission);
                }else{
                    if((Boolean) permission.get("enabled")){
                        existingPermission.put("enabled",true);
                    }
                }
            }
            permissions.put(ROUTES,routePermissionsMap.values());
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

    private List<String> getRoles(){
        List<String> result = new ArrayList<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        for(GrantedAuthority role: auth.getAuthorities()){
            if(!result.contains(role.toString())){
                result.add(role.toString());
            }
        }
        return result;
    }
}
