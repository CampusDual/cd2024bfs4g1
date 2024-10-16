import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { BootcampNewComponent } from './bootcamp-new/bootcamp-new.component';


@NgModule({
  declarations: [
    BootcampDetailsComponent,
    BootcampListComponent,
    BootcampNewComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule { }
