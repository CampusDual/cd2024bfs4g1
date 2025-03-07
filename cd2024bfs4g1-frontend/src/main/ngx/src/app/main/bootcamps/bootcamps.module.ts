import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { StudentBootcampAddComponent } from './bootcamp-details/student-bootcamp-add/student-bootcamp-add.component';
import { BootcampNewComponent } from './bootcamp-new/bootcamp-new.component';
import { StudentBootcampDetailComponent } from './bootcamp-details/student-bootcamp-detail/student-bootcamp-detail.component';
import { BootcampTimetableNewComponent } from './bootcamp-details/bootcamp-timetable-new/bootcamp-timetable-new.component';
import { TutorBootcampAddComponent } from './bootcamp-details/tutor-bootcamp-add/tutor-bootcamp-add.component';
import { NewSessionBootcampComponent } from './bootcamp-details/new-session-bootcamp/new-session-bootcamp.component';
import { UpdateSessionBootcampComponent } from './bootcamp-details/update-session-bootcamp/update-session-bootcamp.component';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    BootcampListComponent,
    BootcampDetailsComponent,
    StudentBootcampAddComponent,
    BootcampNewComponent,
    StudentBootcampDetailComponent,
    BootcampTimetableNewComponent,
    TutorBootcampAddComponent,
    NewSessionBootcampComponent,
    UpdateSessionBootcampComponent

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    BootcampsRoutingModule,
    SharedModule
]
})
export class BootcampsModule { }
