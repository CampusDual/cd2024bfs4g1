import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsNewComponent } from './students-new/students-new.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { StudentsTableComponent } from './students-table/students-table.component';
import { BootcampStudentAddComponent } from './students-detail/bootcamp-student-add/bootcamp-student-add.component';
import{MatIconModule} from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    StudentsDetailComponent,
    StudentsNewComponent,
    StudentsTableComponent,
    BootcampStudentAddComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    OntimizeWebModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
