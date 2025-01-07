import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OTextInputComponent } from 'ontimize-web-ngx';
@Component({
  selector: 'app-attendance-status-new',
  templateUrl: './attendance-status-new.component.html',
  styleUrls: ['./attendance-status-new.component.css']
})
export class AttendanceStatusNewComponent {
  constructor(private router: Router) { }
  volver(e) {
    this.router.navigate(['./main/config']);
  }
  selectedColor: string = '#ffffff';
  

}
