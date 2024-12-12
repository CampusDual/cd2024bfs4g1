import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component'
import { PersonalTutorInfoComponent } from './personal-tutor-info/personal-tutor-info.component';
import { BootcampStudentsTableComponent } from './personal-tutor-info/bootcamp-students-table/bootcamp-students-table.component';
import { PersonalInfoSessionsComponent } from './personal-info/personal-info-sessions/personal-info-sessions.component';
import { UpdateSessionTutorComponent } from './personal-tutor-info/update-session-bootcamp/update-session-tutor.component';
import { NewSessionBootcampComponent } from './personal-tutor-info/new-session-bootcamp/new-session-bootcamp.component';

const routes: Routes = [

  {path: 'student',component: PersonalInfoComponent},
  {path: 'tutor',component: PersonalTutorInfoComponent},
  {path: 'tutor/:id',component: BootcampStudentsTableComponent},
  {path: 'student/:id',component: PersonalInfoSessionsComponent},
  {path: 'tutor/:id_bootcamp/session/new', component: NewSessionBootcampComponent},
  {path: 'tutor/:id_bootcamp/session/:id', component: UpdateSessionTutorComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
