import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import spainProvinces from 'src/app/main/students/provinces';

@Component({
  selector: 'app-students-new',
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.css']
})
export class StudentsNewComponent {

  @ViewChild('studentsform') protected formStudents: OFormComponent;

  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];


  constructor() {
    this.validatorsArray.push(this.dateValidator);
  }

  dataArray = spainProvinces.map(provincia => ({ key: provincia, value: provincia }));

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar

  insertStudent() {
    this.formStudents.insert();
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};

    if (control && control.parent && control.value) {
      let enddate = control.value.valueOf();
      let startdate = control.parent.value.fct_start;

      if (enddate && startdate && enddate < startdate) {
        result['wrongendate'] = true;
      }
    }

    return result;
  }


  throwChange(enddate: ODateInputComponent) {
    enddate.getControl().updateValueAndValidity();
  }
  throwChange2(startdate: ODateInputComponent) {
    startdate.getControl().updateValueAndValidity();
  }
}

