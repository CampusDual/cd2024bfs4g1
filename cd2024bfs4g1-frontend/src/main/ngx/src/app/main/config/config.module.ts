import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { EmploymentStatusNewComponent } from './employment-status-new/employment-status-new.component';
import { EmploymentStatusDetailsComponent } from './employment-status-details/employment-status-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { StudentStatusNewComponent } from './student-status-new/student-status-new.component';
import { StudentStatusDetailsComponent } from './student-status-details/student-status-details.component';


@NgModule({
  declarations: [
    ConfigTablesComponent,
    EmploymentStatusNewComponent,
    EmploymentStatusDetailsComponent,
    StudentStatusNewComponent,
    StudentStatusDetailsComponent,
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    OntimizeWebModule
  ]
})
export class ConfigModule { }
