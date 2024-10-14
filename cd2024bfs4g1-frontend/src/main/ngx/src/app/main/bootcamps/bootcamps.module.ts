import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampsDetailsComponent } from './bootcamps-details/bootcamps-details.component';


@NgModule({
  declarations: [
    BootcampsDetailsComponent
  ],
  imports: [
    CommonModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule { }
