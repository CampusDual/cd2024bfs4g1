import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OFormComponent } from 'ontimize-web-ngx';
@Component({
  selector: 'app-employment-status-new',
  templateUrl: './employment-status-new.component.html',
  styleUrls: ['./employment-status-new.component.css']
})
export class EmploymentStatusNewComponent {


  constructor(private router: Router) { }
  volver(e) {
    this.router.navigate(['./main/config']);
  }
}
