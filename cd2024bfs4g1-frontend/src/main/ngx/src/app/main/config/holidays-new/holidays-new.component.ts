import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { OValidators } from 'ontimize-web-ngx';

@Component({
  selector: 'app-holidays-new',
  templateUrl: './holidays-new.component.html',
  styleUrls: ['./holidays-new.component.css']
})
export class HolidaysNewComponent {
  validatorsWithoutSpace: ValidatorFn[] = [];
  
  constructor(private router: Router) {
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
  }
  volver(e) {
    this.router.navigate(['./main/config']);
  }
    
}
