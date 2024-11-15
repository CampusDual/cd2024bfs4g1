import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component'

const routes: Routes = [

  {path:"",pathMatch:"full",component:PersonalInfoComponent},
  {path: ':id',component: PersonalInfoComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }