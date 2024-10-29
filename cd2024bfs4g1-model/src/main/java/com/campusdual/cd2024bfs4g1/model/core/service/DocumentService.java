package com.campusdual.cd2024bfs4g1.model.core.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.campusdual.cd2024bfs4g1.api.core.service.IDocumentService;
import com.campusdual.cd2024bfs4g1.model.core.dao.DocumentFileDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import com.ontimize.jee.server.dao.IOntimizeDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service("DocumentService")
@Lazy
public class DocumentService implements IDocumentService {
    @Autowired
    private DocumentFileDao documentFileDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult personalFilesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query((IOntimizeDaoSupport) this.documentFileDao, keyMap, attrList, "documentfiles");
    }

    @Override
    public EntityResult personalFileInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert((IOntimizeDaoSupport) this.documentFileDao, attrMap);
    }

    @Override
    public EntityResult personalFilesDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        List<String> attrList = new ArrayList<>();
        attrList.add(DocumentFileDao.ATTR_PATH);
        EntityResult fileResult = daoHelper.query((IOntimizeDaoSupport) documentFileDao, keyMap, attrList);

        if (fileResult.isWrong()) {
            return fileResult;
        }
        String filePath = (String) fileResult.getRecordValues(0).get(DocumentFileDao.ATTR_PATH);
        if (filePath != null && !filePath.isEmpty()) {
            File fichero = new File(filePath);
            if (fichero.delete()) {

            } else {
                EntityResult errorResult = new EntityResultMapImpl();
                errorResult.setCode(EntityResult.OPERATION_WRONG);
                errorResult.setMessage("FILE ERROR ON DELETE ");
                return errorResult;
            }
        }
        return this.daoHelper.delete((IOntimizeDaoSupport)this.documentFileDao, keyMap);
    }
}
