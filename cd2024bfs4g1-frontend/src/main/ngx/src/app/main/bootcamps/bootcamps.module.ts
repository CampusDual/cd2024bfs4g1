import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    BootcampDetailsComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule { }
