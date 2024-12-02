import { Component, ViewChild } from '@angular/core';
import moment from 'moment';
import { ODateInputComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-employment-history-details',
  templateUrl: './employment-history-details.component.html',
  styleUrls: ['./employment-history-details.component.css']
})
export class EmploymentHistoryDetailsComponent {
  @ViewChild('employment_status_history_details') employment_status_history_details :OFormComponent;
  @ViewChild("status_date_change") DateInput: ODateInputComponent;
 
  
  public selected = {};
  $event: any;
  

}
