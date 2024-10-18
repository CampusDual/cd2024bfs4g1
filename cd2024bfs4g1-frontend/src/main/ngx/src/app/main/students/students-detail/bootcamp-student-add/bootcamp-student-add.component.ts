import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bootcamp-student-add',
  templateUrl: './bootcamp-student-add.component.html',
  styleUrls: ['./bootcamp-student-add.component.css']
})
export class BootcampStudentAddComponent {
constructor(public location:Location){}
}
