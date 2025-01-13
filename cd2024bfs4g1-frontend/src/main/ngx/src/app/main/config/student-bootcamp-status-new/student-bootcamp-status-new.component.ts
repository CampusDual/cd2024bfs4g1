import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-bootcamp-status-new',
  templateUrl: './student-bootcamp-status-new.component.html',
  styleUrls: ['./student-bootcamp-status-new.component.css']
})
export class StudentBootcampStatusNewComponent {
    constructor(private router: Router) { }
    volver(e) {
    this.router.navigate(['./main/config']);
    }
}
