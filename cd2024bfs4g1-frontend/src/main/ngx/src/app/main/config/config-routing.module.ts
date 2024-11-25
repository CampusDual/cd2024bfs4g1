import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { EmploymentStatusDetailsComponent } from './employment-status-details/employment-status-details.component';
import { EmploymentStatusNewComponent } from './employment-status-new/employment-status-new.component';
import { StudentStatusNewComponent } from './student-status-new/student-status-new.component';
import { StudentStatusDetailsComponent } from './student-status-details/student-status-details.component';
import { TutorTypeNewComponent } from './tutor-type-new/tutor-type-new.component';
import { TutorTypeDetailsComponent } from './tutor-type-details/tutor-type-details.component';
import { StudentBootcampDetailComponent } from '../bootcamps/bootcamp-details/student-bootcamp-detail/student-bootcamp-detail.component';
import { StudentBootcampStatusComponent } from './student-bootcamp-status/student-bootcamp-status.component';
import { StudentBootcampStatusNewComponent } from './student-bootcamp-status-new/student-bootcamp-status-new.component';
import { AttendanceStatusDetailsComponent } from './attendance-status-details/attendance-status-details.component';
import { AttendanceStatusNewComponent } from './attendance-status-new/attendance-status-new.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component: ConfigTablesComponent},
  {path: 'employmentstatus/new',component: EmploymentStatusNewComponent},
  {path: 'employmentstatus/:id',component: EmploymentStatusDetailsComponent},
  {path: 'studentstatus/new',component: StudentStatusNewComponent},
  {path: 'studentstatus/:id',component: StudentStatusDetailsComponent},
  {path: 'tutortype/new',component: TutorTypeNewComponent},
  {path: 'tutortype/:id',component: TutorTypeDetailsComponent},
  {path: 'attendancestatus/new',component: AttendanceStatusNewComponent},
  {path: 'attendancestatus/:id',component: AttendanceStatusDetailsComponent},
  {path: 'tutortype/:id',component: TutorTypeDetailsComponent},
  {path: 'studentbootcampstatus/new',component: StudentBootcampStatusNewComponent},
  {path: 'studentbootcampstatus/:id',component: StudentBootcampStatusComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
