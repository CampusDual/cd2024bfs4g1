import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarTimestampsComponent } from '../calendar-timestamps/calendar-timestamps/calendar-timestamps.component';
import { CalendarTimestampsModule } from '../calendar-timestamps/calendar-timestamps.module';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarTimestampsModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
