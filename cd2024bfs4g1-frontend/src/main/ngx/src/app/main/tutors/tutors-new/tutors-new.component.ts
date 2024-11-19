import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { OValidators } from 'ontimize-web-ngx';

@Component({
  selector: 'app-tutors-new',
  templateUrl: './tutors-new.component.html',
  styleUrls: ['./tutors-new.component.css']
})
export class TutorsNewComponent {
  
  validatorsWithoutSpace: ValidatorFn[] = [];

  constructor() { 
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
  }
  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
