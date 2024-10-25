import { Component } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import spainProvinces from 'src/app/main/students/provinces';
@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent {
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  dataArray = spainProvinces.map(provincia => ({ key: provincia, value: provincia }));

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar


  constructor(private router: Router) {
    this.validatorsArray.push(this.dateValidator);
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};

    if (!control || !control.parent) {
      return result; // Retorna un objeto vacío si no hay control o parent
    }
  
    // Obtener los valores de las fechas
    const enddate = control.value; // Fecha de finalización
    const startdate = control.parent.value.fct_start; // Fecha de inicio
  
    // Si alguno de los dos es null, no aplicar el validador
    if (!enddate || !startdate) {
      return result; // Retorna un objeto vacío si alguna fecha es nula
    }
  
    // Validar si enddate es menor que startdate
    if (enddate.valueOf() < startdate.valueOf()) {
      result['wrongendate'] = true; // Agregar error si enddate es menor
    }
  
    return result; // Retornar el resultado de la validación
  }


  throwChange(enddate: ODateInputComponent) {
    enddate.getControl().updateValueAndValidity();
  }
  throwChange2(startdate: ODateInputComponent) {
    startdate.getControl().updateValueAndValidity();
  }
}
