import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { EmploymentStatusDetailsComponent } from './employment-status-details/employment-status-details.component';
import { EmploymentStatusNewComponent } from './employment-status-new/employment-status-new.component';
import { StudentStatusNewComponent } from './student-status-new/student-status-new.component';
import { StudentStatusDetailsComponent } from './student-status-details/student-status-details.component';
const routes: Routes = [
  {path:'', pathMatch:'full', component: ConfigTablesComponent},
  {path: 'employmentstatus/new',component: EmploymentStatusNewComponent},
  {path: 'employmentstatus/:id',component: EmploymentStatusDetailsComponent},
  {path: 'studentstatus/new',component: StudentStatusNewComponent},
  {path: 'studentstatus/:id',component: StudentStatusDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
