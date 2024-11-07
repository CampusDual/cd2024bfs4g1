import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tutors-detail',
  templateUrl: './tutors-detail.component.html',
  styleUrls: ['./tutors-detail.component.css']
})
export class TutorsDetailComponent{
  
  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

}
