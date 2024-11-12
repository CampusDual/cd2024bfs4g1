import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsNewComponent } from './students-new/students-new.component';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { BootcampStudentAddComponent } from './students-detail/bootcamp-student-add/bootcamp-student-add.component';


const routes: Routes = [
  { path:'', pathMatch:'full', component: StudentsTableComponent},
  { path:"new", component:StudentsNewComponent},
  { path:":id", component:StudentsDetailComponent},
  { path:":student_id/new", component:BootcampStudentAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
