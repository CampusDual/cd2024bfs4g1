package com.campusdual.cd2024bfs4g1.model.core.service;

import com.campusdual.cd2024bfs4g1.api.core.service.IHolidaysService;
import com.campusdual.cd2024bfs4g1.model.core.CdUtils;
import com.campusdual.cd2024bfs4g1.model.core.dao.HolidaysDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("HolidaysService")
@Lazy
public class HolidaysService implements IHolidaysService {

    @Autowired
    private HolidaysDao holidaysDao;

    CdUtils cdUtils;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult holidaysInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.holidaysDao, attrMap);
    }


    @Override
    public EntityResult holidaysDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.holidaysDao, keyMap);
    }

    @Override
    public EntityResult holidaysQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(this.holidaysDao, keyMap, attrList);
    }

}
