import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-student-bootcamp-add',
  templateUrl: './student-bootcamp-add.component.html',
  styleUrls: ['./student-bootcamp-add.component.css']
})
export class StudentBootcampAddComponent {

  @ViewChild('studentBootcampForm') studentBootcampForm:OFormComponent;

  addStudentBootcamp() {
      this.studentBootcampForm.insert();
  }


  navigateBack() {
    window.history.back();
  }
}
