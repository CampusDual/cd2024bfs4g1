import { Component, ViewChild } from '@angular/core';
import { OTextInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bootcamp-students-table',
  templateUrl: './bootcamp-students-table.component.html',
  styleUrls: ['./bootcamp-students-table.component.css']
})
export class BootcampStudentsTableComponent {
  
  bootcampId: number;
  @ViewChild('bootcampId') bootcampIdComp: OTextInputComponent

  loadBootcamp() {
    this.bootcampId= this.bootcampIdComp.getValue();
    
  }
}
