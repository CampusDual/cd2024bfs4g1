import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component'
import { PersonalTutorInfoComponent } from './personal-tutor-info/personal-tutor-info.component';
import { BootcampStudentsTableComponent } from './personal-tutor-info/bootcamp-students-table/bootcamp-students-table.component';
import { PersonalInfoSessionsComponent } from './personal-info/personal-info-sessions/personal-info-sessions.component';
import { UpdateSessionTutorComponent } from './personal-tutor-info/update-session-bootcamp/update-session-tutor.component';
import { NewSessionBootcampComponent } from './personal-tutor-info/new-session-bootcamp/new-session-bootcamp.component';

const routes: Routes = [

  {path: 'student',component: PersonalInfoComponent, data: {oPermission: {permissionId: 'data-student-permission', restrictedPermissionsRedirect: '/login'}}},
  {path: 'tutor',component: PersonalTutorInfoComponent, data: {oPermission: {permissionId: 'data-tutor-permission', restrictedPermissionsRedirect: '/login'}}},
  {path: 'tutor/:id',component: BootcampStudentsTableComponent, data: {oPermission: {permissionId: 'bootcamp-student-permission', restrictedPermissionsRedirect: '/main/home'}}},
  {path: 'student/:id',component: PersonalInfoSessionsComponent, data: {oPermission: {permissionId: 'sessions-student-permission', restrictedPermissionsRedirect: '/main/home'}}},
  {path: 'tutor/:id_bootcamp/session/new', component: NewSessionBootcampComponent, data: {oPermission: {permissionId: 'new-session-permission', restrictedPermissionsRedirect: '/login'}}},
  {path: 'tutor/:id_bootcamp/session/:id', component: UpdateSessionTutorComponent, data: {oPermission: {permissionId: 'update-session-permission', restrictedPermissionsRedirect: '/login'}}}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
