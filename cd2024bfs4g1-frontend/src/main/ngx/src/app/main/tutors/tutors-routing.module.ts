import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorsNewComponent } from './tutors-new/tutors-new.component';
import { TutorsDetailComponent } from './tutors-detail/tutors-detail.component';
import { TutorsTableComponent } from './tutors-table/tutors-table.component';
import { BootcampTutorAddComponent } from './tutors-detail/bootcamp-tutor-add/bootcamp-tutor-add.component';

const routes: Routes = [
  { path:'', pathMatch:'full', component: TutorsTableComponent},
  { path:"new", component:TutorsNewComponent},
  { path:":id", component:TutorsDetailComponent},
  { path:":tutor_id/new", component:BootcampTutorAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorsRoutingModule { }