import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { OValidators } from 'ontimize-web-ngx';

@Component({
  selector: 'app-tutors-detail',
  templateUrl: './tutors-detail.component.html',
  styleUrls: ['./tutors-detail.component.css']
})
export class TutorsDetailComponent{

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
