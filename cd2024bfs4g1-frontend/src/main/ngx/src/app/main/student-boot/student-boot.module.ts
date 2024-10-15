import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentBootcampPruebaComponent } from './student-bootcamp-prueba/student-bootcamp-prueba.component';
import { StudentBootRoutingModule } from './student-boot-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';



@NgModule({
  declarations: [
    StudentBootcampPruebaComponent,
  
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    StudentBootRoutingModule
  ],
  exports: [
    StudentBootcampPruebaComponent 
  ]
})
export class StudentBootModule { }
