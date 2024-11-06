import { Component } from '@angular/core';

@Component({
  selector: 'app-tutors-new',
  templateUrl: './tutors-new.component.html',
  styleUrls: ['./tutors-new.component.css']
})
export class TutorsNewComponent {
  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
