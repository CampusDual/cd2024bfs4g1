import { Component, ViewChild } from '@angular/core';
import { OFormComponent, OTextInputComponent, OTextInputModule } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import spainComunitys from 'src/app/main/students/spaincomunitys';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent {
  @ViewChild("idNumber") idNumber: OTextInputComponent;
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));






  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar


  constructor(private router: Router, public location : Location) {
    this.validatorsArray.push(this.dateValidator);
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

 mostrarBoton: boolean = true; ngOnInit() {  
  this.mostrarBoton = !this.router.url.includes('isdetail'); }
 
  getFileData() {
    console.log(this.idNumber);
    if (this.idNumber){
      return { student_id: this.idNumber.getValue() };
    }else{
      return null;
    }
   
     

  }

  // Método para manejar la respuesta de la subida de archivos
  onUploadFiles(event) {
    console.log(event);
  }

  onFileUpload() {

  }

  onError(event) {
    // Manejar error en la subida de archivos
    if (event.status === 507) {
      this.showError(event);
    }

  }
  showError(event: any) {
    console.log(event);
  }
}
