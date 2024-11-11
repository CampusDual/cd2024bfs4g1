import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { EmploymentStatusDetailsComponent } from './employment-status-details/employment-status-details.component';
import { EmploymentStatusNewComponent } from './employment-status-new/employment-status-new.component';
const routes: Routes = [
  {path:'', pathMatch:'full', component: ConfigTablesComponent},
  {path: 'employmentstatus/new',component: EmploymentStatusNewComponent},
  {path: 'employmentstatus/:id',component: EmploymentStatusDetailsComponent},
  {path: 'studentstatus/new',component: EmploymentStatusNewComponent},
  {path: 'studentstatus/:id',component: EmploymentStatusDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
