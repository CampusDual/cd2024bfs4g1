import { Component, ViewChild } from '@angular/core';
import { OFormCacheClass, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bootcamp-students-table',
  templateUrl: './bootcamp-students-table.component.html',
  styleUrls: ['./bootcamp-students-table.component.css']
})
export class BootcampStudentsTableComponent {
  
  bootcampId: number;
  @ViewChild('bootcampDetailForm') bootcampDetailForm: OFormComponent;

  loadBootcamp() {
    this.bootcampId= this.bootcampDetailForm.getFieldValue("id");
    console.log(this.bootcampId);
  }
}
