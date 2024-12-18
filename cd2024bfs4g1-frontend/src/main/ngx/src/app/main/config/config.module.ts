import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { EmploymentStatusNewComponent } from './employment-status-new/employment-status-new.component';
import { EmploymentStatusDetailsComponent } from './employment-status-details/employment-status-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { StudentStatusNewComponent } from './student-status-new/student-status-new.component';
import { StudentStatusDetailsComponent } from './student-status-details/student-status-details.component';
import { TutorTypeNewComponent } from './tutor-type-new/tutor-type-new.component';
import { TutorTypeDetailsComponent } from './tutor-type-details/tutor-type-details.component';
import { AttendanceStatusDetailsComponent } from './attendance-status-details/attendance-status-details.component';
import { AttendanceStatusNewComponent } from './attendance-status-new/attendance-status-new.component';


@NgModule({
  declarations: [
    ConfigTablesComponent,
    EmploymentStatusNewComponent,
    EmploymentStatusDetailsComponent,
    StudentStatusNewComponent,
    StudentStatusDetailsComponent,
    TutorTypeNewComponent,
    TutorTypeDetailsComponent,
    AttendanceStatusDetailsComponent,
    AttendanceStatusNewComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    OntimizeWebModule
  ]
})
export class ConfigModule { }
