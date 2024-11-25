import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component'
import { PersonalTutorInfoComponent } from './personal-tutor-info/personal-tutor-info.component';

const routes: Routes = [

  {path:"",pathMatch:"full",component:PersonalInfoComponent},
  {path: 'student',component: PersonalInfoComponent},
  {path: 'tutor',component: PersonalTutorInfoComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }