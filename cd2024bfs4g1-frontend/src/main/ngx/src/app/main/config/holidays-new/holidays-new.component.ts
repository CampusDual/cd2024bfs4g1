import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-holidays-new',
  templateUrl: './holidays-new.component.html',
  styleUrls: ['./holidays-new.component.css']
})
export class HolidaysNewComponent {
  constructor(private router: Router) { }
  volver(e) {
    this.router.navigate(['./main/config']);
  }
}
