package com.campusdual.cd2024bfs4g1.ws.core.rest;
import com.campusdual.cd2024bfs4g1.model.core.dao.DocumentFileDao;
import com.campusdual.cd2024bfs4g1.api.core.service.IDocumentService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class DocumentRestController extends ORestController<IDocumentService> {
    public static final String STATUS = "status";
    public static final String NAME = "name";

    //the parameter in the yml where put the files in local path
    @Value("${aap.files.path}")
    private String path;

    @Autowired
    private IDocumentService documentsrv;

    @Override
    public IDocumentService getService() {
        return this.documentsrv;
    }

    @PostMapping(value = "upload")
    public ResponseEntity upload(@RequestParam("name") String[] names, @RequestParam("file") MultipartFile[] files, @RequestParam(name="data",required = false) String data) {

        //cast the data to a map object
        HashMap<String, Object> extraData = new HashMap<>();
        if (data != null) {
            try {
                extraData = new ObjectMapper().readValue(data, HashMap.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        String student_id = "";
        EntityResult result = new EntityResultMapImpl();
        if(extraData.get(DocumentFileDao.ATTR_ID_STUDENT) instanceof Map){
            //get the user associated
            //get the description associated
            Map mStudentId = (Map) extraData.get(DocumentFileDao.ATTR_ID_STUDENT);
            student_id = (String) mStudentId.get("value");

            //the directory is related to the product
            String directory = path+student_id;
            try {
                //create the directory if not exists
                Files.createDirectories(Paths.get(directory));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            for(MultipartFile file:files){
                //for each file sote the file locally
                String filePath = directory+"\\"+file.getOriginalFilename();
                File newFile = new File(filePath);
                Map<String,Object> fileResult = new HashMap<>();
                try {
                    if(newFile.exists()){
                        //if exist not replace and return the already exists state
                        fileResult.put(NAME,file.getOriginalFilename());
                        fileResult.put(STATUS,"ALREADY_EXIST");
                    }else{
                        //write the file in the disk
                        file.transferTo(newFile);
                        Map<String,Object> attrMap = new HashMap();
                        attrMap.put(DocumentFileDao.ATTR_ID_STUDENT,student_id);
                        attrMap.put(DocumentFileDao.ATTR_NAME,file.getOriginalFilename());
                        attrMap.put(DocumentFileDao.ATTR_PATH,filePath);
                        EntityResult fileInsert = documentsrv.personalFileInsert(attrMap);
                        if(fileInsert.isWrong()){
                            fileResult.put(NAME,file.getOriginalFilename());
                            fileResult.put(STATUS,"ERROR_ON_INSERT");
                        }else{
                            fileResult.put(NAME,file.getOriginalFilename());
                            fileResult.put(STATUS,"OK");
                        }
                    }
                } catch (IOException e) {
                    fileResult.put(NAME,file.getOriginalFilename());
                    fileResult.put(STATUS,"ERROR_ON_WRITE_FILE");
                }
                result.addRecord(fileResult);
            }
        }

        return new ResponseEntity<EntityResult>(result,HttpStatus.OK);
    }


    /*@PostMapping(value="upload")
    public ResponseEntity upload(@RequestParam("name") String name, @RequestParam("file") MultipartFile file, @RequestParam(name="data",required=false) String data ){
        HashMap<String, Object> extraData = new HashMap<>();
        if (data != null) {
           try {
               extraData = new ObjectMapper().readValue(data, HashMap.class);
           } catch (JsonProcessingException e) {
               e.printStackTrace();
           }
        }
        String field1 = null; //no hacerle mucho caso a los nombres
        String field2 = null;
        EntityResult result = new EntityResultMapImpl();
        if(extraData.get(DocumentFileDao.ATTR_FIELD1) instanceof Map){
            Map mField1 = (Map) extraData.get(DocumentFileDao.ATTR_FIELD1);
            field1 = (String) mField1.get("field1");
            field2 = (String) mField1.get("field2");

            String directory = path+File.separator+name; //No se si esta bien analizar
            try {
                Files.createDirectories(Paths.get(directory));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            String filePath = directory+"\\"+file.getOriginalFilename(); // Esta funcion da el nombre bien??
            File newFile = new File(filePath);
            Map<String,Object> fileResult = new HashMap();
            try{
                if(newFile.exists()){
                    fileResult.put(NAME, file);//Presuponiendo que file es el nombre del archivo
                    fileResult.put(STATUS, "ALREADY_EXISTS");
                }else{
                    //Escribir archivo en el disco
                    file.transferTo(newFile); //No deja porque es un string npi???
                    Map<String,Object> attrMap = new HashMap();
                    attrMap.put(DocumentFileDao.ATTR_FIELD1, field1);
                    attrMap.put(DocumentFileDao.ATTR_NAME, file.getOriginalFilename());
                    attrMap.put(DocumentFileDao.ATTR_PATH, filePath);
                    EntityResult fileInsert = documentsrv.personalFileInsert(attrMap);
                    if (fileInsert.isWrong()){
                        fileResult.put(NAME, file.getOriginalFilename());
                        fileResult.put(STATUS, "ERROR_ON_INSERT");
                    }else{
                        fileResult.put(NAME, file.getOriginalFilename());
                        fileResult.put(STATUS, "OK");
                    }

                }
            }catch (IOException e){
                fileResult.put(NAME, file.getOriginalFilename());
                fileResult.put(STATUS, "ERROR_ON_WRITE");
            }
            result.addRecord(fileResult);
        }

        return new ResponseEntity<EntityResult>(result, HttpStatus.OK);
    }*/

}
