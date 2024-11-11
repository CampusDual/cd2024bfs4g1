import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { EmploymentStatusNewComponent } from './employment-status-new/employment-status-new.component';
import { EmploymentStatusDetailsComponent } from './employment-status-details/employment-status-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    ConfigTablesComponent,
    EmploymentStatusNewComponent,
    EmploymentStatusDetailsComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    OntimizeWebModule
  ]
})
export class ConfigModule { }
