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
    public ResponseEntity upload(@RequestParam("name") String[] names, @RequestParam("file") MultipartFile[] files, @RequestParam(name = "data", required = false) String data) {

        HashMap<String, Object> extraData = new HashMap<>();
        if (data != null) {
            try {
                extraData = new ObjectMapper().readValue(data, HashMap.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        Number student_id = null;
        EntityResult result = new EntityResultMapImpl();
        if (extraData.get(StudentDocumentDao.ATTR_ID_STUDENT) instanceof Number) {
            student_id = (Number) extraData.get(StudentDocumentDao.ATTR_ID_STUDENT);

            String directory = path +"\\students\\" + student_id;
            try {
                Files.createDirectories(Paths.get(directory));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            for (MultipartFile file : files) {
                String filePath = directory + "\\" + file.getOriginalFilename();
                File newFile = new File(filePath);
                Map<String, Object> fileResult = new HashMap<>();
                try {
                    if (newFile.exists()) {
                        fileResult.put(NAME, file.getOriginalFilename());
                        fileResult.put(STATUS, "ALREADY_EXIST");
                    } else {
                        file.transferTo(newFile);

                        Map<String, Object> attrMap = new HashMap();
                        attrMap.put(DocumentFileDao.ATTR_NAME, file.getOriginalFilename());
                        attrMap.put(DocumentFileDao.ATTR_PATH, filePath);
                        EntityResult fileInsert = documentsrv.personalFileInsert(attrMap);
                        Number id = null;
                        if (fileInsert.get(DocumentFileDao.ATTR_ID) instanceof Number) {
                            id = (Number) fileInsert.get(DocumentFileDao.ATTR_ID);
                            Map<String, Object> attrMap2 = new HashMap();
                            attrMap2.put(StudentDocumentDao.ATTR_ID_STUDENT, student_id);
                            attrMap2.put(StudentDocumentDao.ATTR_ID_DOCUMENT, id);
                            documentsrv.studentdocumentInsert(attrMap2);
                        }
                        if (fileInsert.isWrong()) {
                            fileResult.put(NAME, file.getOriginalFilename());
                            fileResult.put(STATUS, "ERROR_ON_INSERT");
                        } else {
                            fileResult.put(NAME, file.getOriginalFilename());
                            fileResult.put(STATUS, "OK");
                        }
                    }
                } catch (IOException e) {
                    fileResult.put(NAME, file.getOriginalFilename());
                    fileResult.put(STATUS, "ERROR_ON_WRITE_FILE");
                }
                result.addRecord(fileResult);
            }
        }

        return new ResponseEntity<EntityResult>(result, HttpStatus.OK);
    }


    @PostMapping(value = "uploadBootcampDocument")
    public ResponseEntity uploadBootcampDocument(@RequestParam("name") String[] names, @RequestParam("file") MultipartFile[] files, @RequestParam(name = "data", required = false) String data) {

        HashMap<String, Object> extraData = new HashMap<>();
        if (data != null) {
            try {
                extraData = new ObjectMapper().readValue(data, HashMap.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        Number bootcamp_id = null;
        EntityResult result = new EntityResultMapImpl();
        if (extraData.get(BootcampDocumentDao.ATTR_ID_BOOTCAMP) instanceof Number) {
            bootcamp_id = (Number) extraData.get(BootcampDocumentDao.ATTR_ID_BOOTCAMP);

            String directory = path +"\\bootcamp\\"+ bootcamp_id;
            try {
                Files.createDirectories(Paths.get(directory));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            for (MultipartFile file : files) {
                String filePath = directory + "\\" + file.getOriginalFilename();
                File newFile = new File(filePath);
                Map<String, Object> fileResult = new HashMap<>();
                try {
                    if (newFile.exists()) {
                        fileResult.put(NAME, file.getOriginalFilename());
                        fileResult.put(STATUS, "ALREADY_EXIST");
                    } else {
                        file.transferTo(newFile);

                        Map<String, Object> attrMap = new HashMap();
                        attrMap.put(DocumentFileDao.ATTR_NAME, file.getOriginalFilename());
                        attrMap.put(DocumentFileDao.ATTR_PATH, filePath);
                        EntityResult fileInsert = documentsrv.personalFileInsert(attrMap);
                        Number id = null;
                        if (fileInsert.get(DocumentFileDao.ATTR_ID) instanceof Number) {
                            id = (Number) fileInsert.get(DocumentFileDao.ATTR_ID);
                            Map<String, Object> attrMap2 = new HashMap();
                            attrMap2.put(BootcampDocumentDao.ATTR_ID_BOOTCAMP, bootcamp_id);
                            attrMap2.put(BootcampDocumentDao.ATTR_ID_DOCUMENT, id);
                            documentsrv.bootcampdocumentInsert(attrMap2);
                        }
                        if (fileInsert.isWrong()) {
                            fileResult.put(NAME, file.getOriginalFilename());
                            fileResult.put(STATUS, "ERROR_ON_INSERT");
                        } else {
                            fileResult.put(NAME, file.getOriginalFilename());
                            fileResult.put(STATUS, "OK");
                        }
                    }
                } catch (IOException e) {
                    fileResult.put(NAME, file.getOriginalFilename());
                    fileResult.put(STATUS, "ERROR_ON_WRITE_FILE");
                }
                result.addRecord(fileResult);
            }
        }

        return new ResponseEntity<EntityResult>(result, HttpStatus.OK);
    }
}
