import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-tutor-bootcamp-add',
  templateUrl: './tutor-bootcamp-add.component.html',
  styleUrls: ['./tutor-bootcamp-add.component.css']
})
export class TutorBootcampAddComponent {

  @ViewChild('tutorBootcampForm') tutorBootcampForm:OFormComponent;

  addTutorBootcamp() {
    this.tutorBootcampForm.insert();
}

}
