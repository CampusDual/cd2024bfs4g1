package com.campusdual.cd2024bfs4g1.ws.core.rest;

import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDocumentDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.DocumentFileDao;
import com.campusdual.cd2024bfs4g1.api.core.service.IDocumentService;
import com.campusdual.cd2024bfs4g1.model.core.dao.StudentDocumentDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;

@RestController
@RequestMapping("/documents")
public class DocumentRestController extends ORestController<IDocumentService> {
    public static final String STATUS = "status";
    public static final String NAME = "name";

    @Value("${app.files.path:#{null}}")
    private String path;

    @Autowired
    private IDocumentService documentsrv;

    @Override
    public IDocumentService getService() {
        return this.documentsrv;
    }

    public DocumentRestController(){
        super();
        if(this.path == null || this.path.isBlank()){
            path=System.getProperty("java.io.tmpdir");
        }
    }
    @PostMapping(value = "upload")
    public ResponseEntity<EntityResult> upload(
            @RequestParam("name") String[] names,
            @RequestParam("file") MultipartFile[] files,
            @RequestParam(name = "data", required = false) String data) {
        return handleUpload(data, files, "students", StudentDocumentDao.ATTR_ID_STUDENT, this::insertStudentDocument);
    }

    @PostMapping(value = "uploadBootcampDocument")
    public ResponseEntity<EntityResult> uploadBootcampDocument(
            @RequestParam("name") String[] names,
            @RequestParam("file") MultipartFile[] files,
            @RequestParam(name = "data", required = false) String data) {
        return handleUpload(data, files, "bootcamp", BootcampDocumentDao.ATTR_ID_BOOTCAMP, this::insertBootcampDocument);
    }

    private ResponseEntity<EntityResult> handleUpload(
            String data,
            MultipartFile[] files,
            String directoryType,
            String idAttribute,
            BiConsumer<Number, Number> documentInsertHandler) {

        HashMap<String, Object> extraData = parseExtraData(data);
        EntityResult result = new EntityResultMapImpl();
        if (extraData.get(idAttribute) instanceof Number) {
            Number entityId = (Number) extraData.get(idAttribute);

            String directory = path + "\\" + directoryType + "\\" + entityId;
            createDirectory(directory);

            for (MultipartFile file : files) {
                String filePath = directory + "\\" + file.getOriginalFilename();
                File newFile = new File(filePath);
                Map<String, Object> fileResult = processFile(file, newFile, filePath, entityId, documentInsertHandler);
                result.addRecord(fileResult);
            }
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private HashMap<String, Object> parseExtraData(String data) {
        if (data == null) return new HashMap<>();
        try {
            return new ObjectMapper().readValue(data, HashMap.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private void createDirectory(String directory) {
        try {
            Files.createDirectories(Paths.get(directory));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Map<String, Object> processFile(
            MultipartFile file,
            File newFile,
            String filePath,
            Number entityId,
            BiConsumer<Number, Number> documentInsertHandler) {

        Map<String, Object> fileResult = new HashMap<>();
        try {
            if (newFile.exists()) {
                fileResult.put(NAME, file.getOriginalFilename());
                fileResult.put(STATUS, "ALREADY_EXIST");
            } else {
                file.transferTo(newFile);

                Map<String, Object> attrMap = new HashMap<>();
                attrMap.put(DocumentFileDao.ATTR_NAME, file.getOriginalFilename());
                attrMap.put(DocumentFileDao.ATTR_PATH, filePath);
                EntityResult fileInsert = documentsrv.personalFileInsert(attrMap);

                if (fileInsert.isWrong()) {
                    fileResult.put(NAME, file.getOriginalFilename());
                    fileResult.put(STATUS, "ERROR_ON_INSERT");
                } else {
                    fileResult.put(NAME, file.getOriginalFilename());
                    fileResult.put(STATUS, "OK");

                    Number documentId = (Number) fileInsert.get(DocumentFileDao.ATTR_ID);
                    documentInsertHandler.accept(entityId, documentId);
                }
            }
        } catch (IOException e) {
            fileResult.put(NAME, file.getOriginalFilename());
            fileResult.put(STATUS, "ERROR_ON_WRITE_FILE");
        }

        return fileResult;
    }

    private void insertStudentDocument(Number studentId, Number documentId) {
        Map<String, Object> attrMap = new HashMap<>();
        attrMap.put(StudentDocumentDao.ATTR_ID_STUDENT, studentId);
        attrMap.put(StudentDocumentDao.ATTR_ID_DOCUMENT, documentId);
        documentsrv.studentdocumentInsert(attrMap);
    }

    private void insertBootcampDocument(Number bootcampId, Number documentId) {
        Map<String, Object> attrMap = new HashMap<>();
        attrMap.put(BootcampDocumentDao.ATTR_ID_BOOTCAMP, bootcampId);
        attrMap.put(BootcampDocumentDao.ATTR_ID_DOCUMENT, documentId);
        documentsrv.bootcampdocumentInsert(attrMap);
    }


}
