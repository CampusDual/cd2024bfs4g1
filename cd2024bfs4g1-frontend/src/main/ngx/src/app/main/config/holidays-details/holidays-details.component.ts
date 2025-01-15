import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { OValidators } from 'ontimize-web-ngx';

@Component({
  selector: 'app-holidays-details',
  templateUrl: './holidays-details.component.html',
  styleUrls: ['./holidays-details.component.css']
})
export class HolidaysDetailsComponent {
  validatorsWithoutSpace: ValidatorFn[] = [];
  
  constructor() {
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
  }
}
