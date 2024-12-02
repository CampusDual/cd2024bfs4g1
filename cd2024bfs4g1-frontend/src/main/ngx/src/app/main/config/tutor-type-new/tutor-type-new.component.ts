import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-type-new',
  templateUrl: './tutor-type-new.component.html',
  styleUrls: ['./tutor-type-new.component.css']
})
export class TutorTypeNewComponent {
  constructor(private router: Router) { }
  volver(e) {
    this.router.navigate(['./main/config']);
  }

}
