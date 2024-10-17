import { Component } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bootcamp-details',
  templateUrl: './bootcamp-details.component.html',
  styleUrls: ['./bootcamp-details.component.css']

})
export class BootcampDetailsComponent {

  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];

  constructor(private router: Router) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsArray1.push(this.dateValidator1);
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

  dateValidator1(control: FormControl): ValidationErrors {
    let result = {};

    if (control && control.parent && control.value) {
      let enddate = control.parent.value.end_date;
      let startdate = control.value.valueOf();

      if (enddate && startdate && enddate < startdate) {
        result['wrongendate'] = true;
      }
    }

    return result;
  }
}
