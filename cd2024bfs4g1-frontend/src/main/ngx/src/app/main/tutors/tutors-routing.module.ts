import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorsNewComponent } from './tutors-new/tutors-new.component';
import { TutorsDetailComponent } from './tutors-detail/tutors-detail.component';
import { TutorsTableComponent } from './tutors-table/tutors-table.component';

const routes: Routes = [
  { path:'', pathMatch:'full', component: TutorsTableComponent},
  { path:"new", component:TutorsNewComponent},
  { path:":id", component:TutorsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorsRoutingModule { }