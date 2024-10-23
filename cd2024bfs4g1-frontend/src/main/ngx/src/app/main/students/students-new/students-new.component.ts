import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-students-new',
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.css']
})
export class StudentsNewComponent {

  @ViewChild('studentsform') protected formStudents: OFormComponent;
  insertStudent() {
    this.formStudents.insert();
  }

}
