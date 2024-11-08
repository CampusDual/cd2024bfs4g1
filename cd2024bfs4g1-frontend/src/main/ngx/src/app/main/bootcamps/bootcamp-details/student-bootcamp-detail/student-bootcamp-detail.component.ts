import { Component, ViewChild } from '@angular/core';
import moment from 'moment';
import { ODateInputComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-student-bootcamp-detail',
  templateUrl: './student-bootcamp-detail.component.html',
  styleUrls: ['./student-bootcamp-detail.component.css']
})
export class StudentBootcampDetailComponent {

  
  @ViewChild('studentBootcampForm') studentBootcampForm:OFormComponent;
  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;

  throwChange($event: any) {

    let startDate = moment($event.newValue.startDate).local();  
    let endDate = moment($event.newValue.endDate).local();

    this.studentBootcampForm.setFieldValue("start_date", startDate);
    this.studentBootcampForm.setFieldValue("end_date", endDate);
  
}
}
