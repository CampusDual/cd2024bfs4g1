import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { StudentBootcampAddComponent } from './bootcamp-details/student-bootcamp-add/student-bootcamp-add.component';

const routes: Routes = [
  {path:"",redirectTo:"list",pathMatch:"full"},
  {path:"list",component:BootcampListComponent},
  {path:'list/:id', component: BootcampDetailsComponent},
  {path:'list/:bootcamp_id/new', component: StudentBootcampAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
