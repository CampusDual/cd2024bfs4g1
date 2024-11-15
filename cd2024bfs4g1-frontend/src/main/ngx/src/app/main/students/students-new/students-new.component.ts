import { Component,Injector, ViewChild } from '@angular/core';
import { OFormComponent,OntimizeService, OValidators } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import spainComunitys from 'src/app/main/students/spaincomunitys';

@Component({
  selector: 'app-students-new',
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.css']
})
export class StudentsNewComponent {

  @ViewChild('studentsform') protected formStudents: OFormComponent;
  protected service: OntimizeService;
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsNewPasswordArray: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];


  constructor() {
  Mostraraviso: boolean =false;


  constructor(protected injector: Injector) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/\d/, 'hasNumber'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[A-Z]/, 'hasCapitalCase'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[a-z]/, 'hasSmallCase'));
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
    this.service = this.injector.get(OntimizeService);
    this.configureService();
  }

  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar

  protected configureService() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

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

  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
  mostrar(event: any) {

    console.log(event.srcElement.value);
    this.getDNI(event.srcElement.value);

  }
}

getDNI(dni:string) {

    const filter = {
      'dni': dni
    };
    const columns = ['id'];
    this.service.query(filter, columns, 'student').subscribe(resp => {
      if (resp.code === 0){
        console.log('DNI encontrado:');
        console.log(resp.data.length);
        if(!resp.data.length){
          this.Mostraraviso=false;
        }else{
          this.Mostraraviso=true;
        }
      } else {
        console.log(resp.message);
        this.Mostraraviso=false;
      }
    });

}
}
