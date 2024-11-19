
import { Component, ViewChild } from '@angular/core';
import moment from 'moment';
import { ODateInputComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-employment-history-new',
  templateUrl: './employment-history-new.component.html',
  styleUrls: ['./employment-history-new.component.css']
})
export class EmploymentHistoryNewComponent {
  
  @ViewChild('employment_status_history_new') employment_status_history_new :OFormComponent;
  @ViewChild("status_date_change") DateInput: ODateInputComponent;
 
  
  public selected = {};
  $event: any;
  
  inicialDate() {
    const startMoment = moment().local();
    this.employment_status_history_new.setFieldValue("status_date_change", startMoment);
  }
}
