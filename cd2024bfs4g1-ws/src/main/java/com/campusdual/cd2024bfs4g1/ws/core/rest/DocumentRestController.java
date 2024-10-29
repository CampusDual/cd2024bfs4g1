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

}
