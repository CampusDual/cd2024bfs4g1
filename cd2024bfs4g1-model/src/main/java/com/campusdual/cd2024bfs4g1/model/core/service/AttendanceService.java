package com.campusdual.cd2024bfs4g1.model.core.service;


import com.campusdual.cd2024bfs4g1.api.core.service.IAttendanceService;
import com.campusdual.cd2024bfs4g1.model.core.dao.AttendanceDao;
import com.campusdual.cd2024bfs4g1.model.core.dao.BootcampDao;
import com.ontimize.jee.common.db.AdvancedEntityResult;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.common.gui.SearchValue;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("AttendanceService")
@Lazy
public class AttendanceService implements IAttendanceService {
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private AttendanceDao attendanceDao;

    @Autowired
    private BootcampDao bootcampDao;

    @Override
    public EntityResult attendanceQuery(Map<String, Object> keyMap, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.attendanceDao, keyMap, attributes);
    }

    @Override
    public EntityResult attendanceInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        System.out.println("attrMap received: " + attrMap);

        EntityResult result = new EntityResultMapImpl();
        try {
            if (attrMap.containsKey("data") && attrMap.get("data") instanceof List) {

                List<Map<String, Object>> attendanceData = (List<Map<String, Object>>) attrMap.get("data");

                SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

                for (Map<String, Object> attendanceRecord : attendanceData) {

                    int statusId = (int) attendanceRecord.get("status");
                    String dateString = (String) attendanceRecord.get("date");
                    Date date = null;
                    try {
                        date = formatter.parse(dateString);
                    } catch (ParseException e) {

                        System.err.println("Error parsing date: " + dateString);
                        continue;
                    }
                    attendanceRecord.put("date", date);
                    attendanceRecord.put("attendance_status_id", statusId);
                    Map<String, Object> filter = Map.of(
                            "student_id", attendanceRecord.get("student_id"),
                            "bootcamp_id", attendanceRecord.get("bootcamp_id"),
                            "date", attendanceRecord.get("date")
                    );

                    EntityResult existingRecord = this.daoHelper.query(this.attendanceDao, filter, List.of("id"));

                    if (existingRecord.calculateRecordNumber() > 0) {
                        Map<String, Object> keyMap = Map.of(AttendanceDao.ATTR_ID, existingRecord.getRecordValues(0).get("id"));
                        Map<String, Object> updateData = Map.of(AttendanceDao.ATTR_STATUS_ID, attendanceRecord.get("status"));
                        this.daoHelper.update(this.attendanceDao, updateData, keyMap);
                    } else {
                        this.daoHelper.insert(this.attendanceDao, attendanceRecord);
                    }
                }

                result.setCode(EntityResult.OPERATION_SUCCESSFUL);
                result.setMessage("Attendance records processed successfully.");
            } else {
                result.setCode(EntityResult.OPERATION_WRONG);
                result.setMessage("Invalid or missing data.");
            }
        } catch (Exception e) {
            result.setCode(EntityResult.OPERATION_WRONG);
            result.setMessage("Error processing attendance records: " + e.getMessage());
        }

        return result;
    }


    @Override
    public EntityResult attendanceUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.attendanceDao, attrMap, keyMap);
    }



    @Override
    public EntityResult attendanceDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.attendanceDao, keyMap);
    }

    @Override
    public EntityResult attendanceDeleteAll(Map<String,Object> keyMap) throws OntimizeJEERuntimeException{

        EntityResult allAttendancesQuery = this.daoHelper.query(this.attendanceDao,keyMap, Arrays.asList(AttendanceDao.ATTR_ID));
        List<?> attendanceIdList = (List<?>) allAttendancesQuery.get(AttendanceDao.ATTR_ID);
        Map<String, Object> attendanceKey = new Hashtable<>();

       if(attendanceIdList == null){
           return new EntityResultMapImpl();
       }
        attendanceKey.put(AttendanceDao.ATTR_ID, new SearchValue(SearchValue.IN,attendanceIdList));
        return this.daoHelper.delete(this.attendanceDao,attendanceKey);
    }
    @Override
    public AdvancedEntityResult attendancePaginationQuery(Map<String, Object> keyMap, List<?> attrList, int recordNumber, int startIndex, List<?> orderBy) throws OntimizeJEERuntimeException {
        return this.daoHelper.paginationQuery(this.attendanceDao, keyMap, attrList, recordNumber, startIndex, orderBy);
    }
}
