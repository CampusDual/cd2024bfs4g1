package com.campusdual.cd2024bfs4g1.model.core;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CdUtils {
    /*Method cast a date in string ISO-8601 format like '2024-12-03T23:00:00.000Z' to Date class
    * if the string cannot be parsed return null*/
    public static Date parseIsoStringDate(String strIsoDate){
        DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        try {
            return fmt.parse(strIsoDate);
        } catch (ParseException e) {
            return null;
        }
    }

    public static EntityResult getWrongEntityResult(String msg){
        EntityResult error = new EntityResultMapImpl();
        error.setCode(EntityResult.OPERATION_WRONG);
        error.setMessage(msg);
        return error;
    }
}
