import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsTableComponent } from './students-table/students-table.component';


@NgModule({
  declarations: [
    StudentsTableComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }