import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-status-new',
  templateUrl: './student-status-new.component.html',
  styleUrls: ['./student-status-new.component.css']
})
export class StudentStatusNewComponent {

  constructor(private router: Router) { }
  volver(e) {
    this.router.navigate(['./main/config']);
  }
}
