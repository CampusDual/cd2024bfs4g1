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

    
  // Verificar que el control y su padre existan
  if (!control || !control.parent) {
    return result; // Retorna un objeto vacío si no hay control o parent
  }

  // Obtener los valores de las fechas
  const enddate = control.value; // Fecha de finalización
  const startdate = control.parent.value.fct_start; // Fecha de inicio

  // Si alguno de los dos es null, no aplicar el validador
  if (!enddate || !startdate) {
    return null; // Retorna un objeto vacío si alguna fecha es nula
  }

  // Validar si enddate es menor que startdate
  if (enddate.valueOf() < startdate.valueOf()) {
    result['wrongendate'] = true; // Agregar error si enddate es menor
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

