import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ODateInputComponent } from 'ontimize-web-ngx';
@Component({
  selector: 'app-bootcamp-new',
  templateUrl: './bootcamp-new.component.html',
  styleUrls: ['./bootcamp-new.component.css']
})
export class BootcampNewComponent {

  validatorsArray: ValidatorFn[] = [];
  @ViewChild("initdate") initdate: ODateInputComponent;

  constructor(private router: Router) {
    this.validatorsArray.push(this.dateValidator);
  }



  volver(e: any) {
    this.router.navigate(['./main/bootcamps']);
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};
    if (this) {
      let enddate: Date = control.value;
      let startdate: Date = this.initdate.getValue();

      if (enddate && startdate && enddate < startdate) {
        result['END_DATE_MORE_THAN_INIT_DATE'] = true;
      }
      console.log(control.value)
    }
    return result;
  }

}
