package com.campusdual.cd2024bfs4g1.model.core.service;

import java.io.File;
import java.io.IOException;
import java.util.*;

import com.campusdual.cd2024bfs4g1.api.core.service.IDocumentService;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDocumentDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.DocumentFileDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDocumentDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service("DocumentService")
@Lazy
public class DocumentService implements IDocumentService {
    @Autowired
    private DocumentFileDao documentFileDao;
    @Autowired
    private StudentDocumentDao studentdocumentDao;
    @Autowired
    private BootcampDocumentDao bootcampDocumentDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Value("${app.files.path:#{null}}")
    private String path;

    public DocumentService(){
        if(this.path == null || this.path.isBlank()){
            path=System.getProperty("java.io.tmpdir");
        }
    }

    @Override
    public EntityResult personalFilesQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(this.documentFileDao, keyMap, attrList, "documentfiles");
    }

    @Override
    public EntityResult personalFileInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(this.documentFileDao, attrMap);
    }

    @Override
    public EntityResult studentdocumentQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(this.studentdocumentDao, keyMap, attrList);
    }

    @Override
    public EntityResult studentdocumentInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(this.studentdocumentDao, attrMap);
    }

    @Override
    public EntityResult personalFilesDelete(Map<String, Object> keyMap) {
        List<String> attrList = new ArrayList<>();
        attrList.add(DocumentFileDao.ATTR_PATH);
        EntityResult fileResult = daoHelper.query(documentFileDao, keyMap, attrList);

        if (fileResult.isWrong()) {
            return fileResult;
        }
        String filePath = (String) fileResult.getRecordValues(0).get(DocumentFileDao.ATTR_PATH);
        if (filePath != null && !filePath.isEmpty()) {
            File fichero = new File(filePath);
            if (!fichero.delete()) {
                EntityResult errorResult = new EntityResultMapImpl();
                errorResult.setCode(EntityResult.OPERATION_WRONG);
                errorResult.setMessage("FILE ERROR ON DELETE ");
                return errorResult;
            }
        }

        return this.daoHelper.delete(this.documentFileDao, keyMap);
    }

    @Override
    public EntityResult myPersonalFilesContentQuery(Map<String, Object> keyMap, List<String> attrList) {
        attrList.add(DocumentFileDao.ATTR_PATH);
        attrList.remove(DocumentFileDao.ATTR_BASE64);

        EntityResult studentDocumentQuery = this.daoHelper.query(studentdocumentDao, keyMap, Arrays.asList(StudentDocumentDao.ATTR_ID_DOCUMENT));
        if (studentDocumentQuery.isWrong()) {
            return studentDocumentQuery;
        }


        Hashtable<String, Object> dKeymap = new Hashtable<>();
        Integer documentId = (Integer) studentDocumentQuery.getRecordValues(0).get(StudentDocumentDao.ATTR_ID_DOCUMENT);
        dKeymap.put(DocumentFileDao.ATTR_ID, documentId);

        EntityResult fileResult = daoHelper.query(documentFileDao, dKeymap, attrList);
        if (fileResult.isWrong()) {
            return fileResult;
        }

        List<String> base64Files = new ArrayList<>();

        for (int i = 0; i < fileResult.calculateRecordNumber(); i++) {
            String filePath = (String) fileResult.getRecordValues(i).get(DocumentFileDao.ATTR_PATH);
            File file = new File(filePath);
            try {
                byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(file));
                base64Files.add(new String(encoded));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        fileResult.put(DocumentFileDao.ATTR_BASE64, base64Files);
        return fileResult;
    }


    @Override
    public EntityResult studentdocumentDelete(Map<String, Object> keyMap) {
        EntityResult studentDocumentQuery = this.daoHelper.query(studentdocumentDao, keyMap, Arrays.asList(StudentDocumentDao.ATTR_ID_DOCUMENT));
        if (studentDocumentQuery.isWrong()) {
            return studentDocumentQuery;
        }
        Integer documentId = (Integer) studentDocumentQuery.getRecordValues(0).get(StudentDocumentDao.ATTR_ID_DOCUMENT);
        EntityResult sdResult = this.daoHelper.delete(this.studentdocumentDao, keyMap);
        if (sdResult.isWrong()) {
            return sdResult;
        }

        Hashtable<String, Object> dKeymap = new Hashtable<>();
        dKeymap.put(DocumentFileDao.ATTR_ID, documentId);
        personalFilesDelete(dKeymap);

        return this.daoHelper.delete(this.documentFileDao, dKeymap);
    }

    @Override
    public EntityResult bootcampdocumentQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(this.bootcampDocumentDao, keyMap, attrList);
    }

    @Override
    public EntityResult bootcampdocumentInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(this.bootcampDocumentDao, attrMap);
    }

    @Override
    public EntityResult bootcampdocumentDelete(Map<String, Object> keyMap) {
        EntityResult bootcampDocumentQuery = this.daoHelper.query(bootcampDocumentDao, keyMap, Arrays.asList(StudentDocumentDao.ATTR_ID_DOCUMENT));
        if (bootcampDocumentQuery.isWrong()) {
            return bootcampDocumentQuery;
        }
        Integer documentId = (Integer) bootcampDocumentQuery.getRecordValues(0).get(StudentDocumentDao.ATTR_ID_DOCUMENT);
        EntityResult sdResult = this.daoHelper.delete(this.bootcampDocumentDao, keyMap);
        if (sdResult.isWrong()) {
            return sdResult;
        }

        Hashtable<String, Object> dKeymap = new Hashtable<>();
        dKeymap.put(DocumentFileDao.ATTR_ID, documentId);
        personalFilesDelete(dKeymap);

        return this.daoHelper.delete(this.bootcampDocumentDao, dKeymap);
    }

    @Override
    public EntityResult bootcampFilesContentQuery(Map<String, Object> keyMap, List<String> attrList) {
        attrList.add(DocumentFileDao.ATTR_PATH);
        attrList.remove(DocumentFileDao.ATTR_BASE64);


        EntityResult bootcampDocumentQuery = this.daoHelper.query(bootcampDocumentDao, keyMap, Arrays.asList(BootcampDocumentDao.ATTR_ID_DOCUMENT));
        if (bootcampDocumentQuery.isWrong()) {
            return bootcampDocumentQuery;
        }


        Hashtable<String, Object> dKeymap = new Hashtable<>();
        Integer documentId = (Integer) bootcampDocumentQuery.getRecordValues(0).get(BootcampDocumentDao.ATTR_ID_DOCUMENT);
        dKeymap.put(DocumentFileDao.ATTR_ID, documentId);

        EntityResult fileResult = daoHelper.query(documentFileDao, dKeymap, attrList);
        if (fileResult.isWrong()) {
            return fileResult;
        }

        List<String> base64Files = new ArrayList<>();

        for (int i = 0; i < fileResult.calculateRecordNumber(); i++) {
            String filePath = (String) fileResult.getRecordValues(i).get(DocumentFileDao.ATTR_PATH);
            File file = new File(filePath);
            try {
                byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(file));
                base64Files.add(new String(encoded));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        fileResult.put(DocumentFileDao.ATTR_BASE64, base64Files);
        return fileResult;
    }

}