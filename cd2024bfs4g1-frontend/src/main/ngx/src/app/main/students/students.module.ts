import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsNewComponent } from './students-new/students-new.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { StudentsTableComponent } from './students-table/students-table.component';
import { BootcampStudentAddComponent } from './students-detail/bootcamp-student-add/bootcamp-student-add.component';


@NgModule({
  declarations: [
    StudentsDetailComponent,
    StudentsNewComponent,
    StudentsTableComponent,
    BootcampStudentAddComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
