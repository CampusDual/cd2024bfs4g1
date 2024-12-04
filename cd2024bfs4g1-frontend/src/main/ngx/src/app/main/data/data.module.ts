import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalTutorInfoComponent } from './personal-tutor-info/personal-tutor-info.component';
import { BootcampStudentsTableComponent } from './personal-tutor-info/bootcamp-students-table/bootcamp-students-table.component';
import { CalendarAttendanceComponent } from './personal-info/calendar-attendance/calendar-attendance.component';




@NgModule({
  declarations: [
    PersonalInfoComponent,
    PersonalTutorInfoComponent,
    BootcampStudentsTableComponent,
    CalendarAttendanceComponent

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    DataRoutingModule
  ]
})
export class DataModule { }