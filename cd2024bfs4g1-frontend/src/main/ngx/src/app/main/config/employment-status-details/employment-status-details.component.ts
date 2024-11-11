import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {OntimizeService } from 'ontimize-web-ngx';
@Component({
  selector: 'app-employment-status-details',
  templateUrl: './employment-status-details.component.html',
  styleUrls: ['./employment-status-details.component.css']
})
export class EmploymentStatusDetailsComponent {
  constructor(private router: Router, private location: Location) { }
  volver() {
   this.location.back();
  }
}
