import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ODateInputComponent, OFormComponent,OValidators } from 'ontimize-web-ngx';
import moment from 'moment';

@Component({
  selector: 'app-bootcamp-new',
  templateUrl: './bootcamp-new.component.html',
  styleUrls: ['./bootcamp-new.component.css']
})
export class BootcampNewComponent {
  @ViewChild('bootcampForm') bootcampForm:OFormComponent;

  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];

  constructor(private router: Router) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
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


  throwChange($event: any) {

    let startDate = moment($event.newValue.startDate).local();
    let endDate = moment($event.newValue.endDate).local();

    this.bootcampForm.setFieldValue("start_date", startDate);
    this.bootcampForm.setFieldValue("end_date", endDate);

 }

//   // throwChange(enddate: ODateInputComponent ) {
//   //   enddate.getControl().updateValueAndValidity();
//   // }
//   throwChange2(startdate: ODateInputComponent ) {
//     startdate.getControl().updateValueAndValidity();
//   }

}
