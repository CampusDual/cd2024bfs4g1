import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarTimestampsRoutingModule } from './calendar-timestamps-routing.module';
import { CalendarTimestampsComponent } from './calendar-timestamps/calendar-timestamps.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    CalendarTimestampsComponent
  ],
  imports: [
    CommonModule,
    CalendarTimestampsRoutingModule,
    OntimizeWebModule,
    ScrollingModule,
  ],
  exports: [
    CalendarTimestampsComponent
  ]
})
export class CalendarTimestampsModule { }
