import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampsDetailsComponent } from './bootcamps-details/bootcamps-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    BootcampsDetailsComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule { }
