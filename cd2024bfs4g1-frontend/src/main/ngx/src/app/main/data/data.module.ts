import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalTutorInfoComponent } from './personal-tutor-info/personal-tutor-info.component';
import { BootcampStudentsTableComponent } from './personal-tutor-info/bootcamp-students-table/bootcamp-students-table.component';
import { PersonalInfoSessionsComponent } from './personal-info/personal-info-sessions/personal-info-sessions.component';
import { UpdateSessionTutorComponent } from './personal-tutor-info/update-session-bootcamp/update-session-tutor.component';
import { NewSessionBootcampComponent } from './personal-tutor-info/new-session-bootcamp/new-session-bootcamp.component';
import { CalendarAttendanceComponent } from './personal-tutor-info/calendar-attendance/calendar-attendance.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    PersonalInfoComponent,
    PersonalTutorInfoComponent,
    BootcampStudentsTableComponent,
    UpdateSessionTutorComponent,
    PersonalInfoSessionsComponent,
    NewSessionBootcampComponent,

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    DataRoutingModule,
    MatSnackBarModule,
    SharedModule,
    MatDialogModule
  ]
})
export class DataModule { }
