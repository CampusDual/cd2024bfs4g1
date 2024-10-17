import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-bootcamp-new',
  templateUrl: './bootcamp-new.component.html',
  styleUrls: ['./bootcamp-new.component.css']
})
export class BootcampNewComponent {

  validatorsArray: ValidatorFn[] = [];

  constructor(private router: Router) {
    this.validatorsArray.push(this.dateValidator);
  }

  volver(e) {
    this.router.navigate(['./main/bootcamps']);
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};

    if (control && control.parent && control.value) {
      let enddate = control.value.valueOf();
      let startdate = control.parent.value.start_date;

      if (enddate && startdate && enddate < startdate) {
        result['wrongendate'] = true;
      }
    }

    return result;
  }

}