import { NgModule,LOCALE_ID } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScheduleRowComponent } from './schedule-row/schedule-row.component';



@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    HomeComponent,
    ScheduleRowComponent
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
})
export class HomeModule { }
