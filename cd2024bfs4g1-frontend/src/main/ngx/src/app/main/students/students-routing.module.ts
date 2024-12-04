import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsNewComponent } from './students-new/students-new.component';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { BootcampStudentAddComponent } from './students-detail/bootcamp-student-add/bootcamp-student-add.component';
import { EmploymentHistoryNewComponent } from './students-detail/employment-history-new/employment-history-new.component';
import { EmploymentHistoryDetailsComponent } from './students-detail/employment-history-details/employment-history-details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: StudentsTableComponent },
  { path: 'new', component: StudentsNewComponent },
  { path: ':student_id/new_employment_history', component: EmploymentHistoryNewComponent },
  { path: ':student_id/new', component: BootcampStudentAddComponent },
  { path: ':student_id/:id', component: EmploymentHistoryDetailsComponent },
  { path: ':id', component: StudentsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
