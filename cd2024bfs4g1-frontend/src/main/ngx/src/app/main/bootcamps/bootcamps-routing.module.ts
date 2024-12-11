import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { StudentBootcampAddComponent } from './bootcamp-details/student-bootcamp-add/student-bootcamp-add.component';
import { BootcampNewComponent } from './bootcamp-new/bootcamp-new.component';
import { StudentBootcampDetailComponent } from './bootcamp-details/student-bootcamp-detail/student-bootcamp-detail.component';
import { BootcampTimetableNewComponent } from './bootcamp-details/bootcamp-timetable-new/bootcamp-timetable-new.component';
import { TutorBootcampAddComponent } from './bootcamp-details/tutor-bootcamp-add/tutor-bootcamp-add.component';
import { NewSessionBootcampComponent } from './bootcamp-details/new-session-bootcamp/new-session-bootcamp.component';
import { UpdateSessionBootcampComponent } from './bootcamp-details/update-session-bootcamp/update-session-bootcamp.component';



const routes: Routes = [

  
  {path:"",pathMatch:"full",component:BootcampListComponent},
  {path: 'new',component: BootcampNewComponent},
  {path: ':id',component: BootcampDetailsComponent},
  {path:':bootcamp_id/new_tutor', component: TutorBootcampAddComponent},
  {path:':id_timetable/newTimetable', component: BootcampTimetableNewComponent},
  {path:':bootcamp_id/session/new', component: NewSessionBootcampComponent},
  {path:':bootcamp_id/session/:id', component: UpdateSessionBootcampComponent},
  {path:':bootcamp_id/new', component: StudentBootcampAddComponent},
  {path:':bootcamp_id/:id', component: StudentBootcampDetailComponent}
 
  


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
