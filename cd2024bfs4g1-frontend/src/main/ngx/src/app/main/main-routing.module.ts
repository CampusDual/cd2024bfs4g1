import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, PermissionsGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [PermissionsGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: { oPermission: {permissionId: 'home-permission', restrictedPermissionsRedirect: '/main/data'}} },
      { path: 'bootcamps', loadChildren: () => import('./bootcamps/bootcamps.module').then(m => m.BootcampsModule), data: {oPermission: {permissionId: 'bootcamps-permission', restrictedPermissionsRedirect: '/main/home'}} },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data: {oPermission: {permissionId: 'admin-permission', restrictedPermissionsRedirect: '/main/home'}} },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), data: {oPermission: {permissionId: 'settings-permission', restrictedPermissionsRedirect: '/main/home'}} },
      { path: 'profile', component: ProfileComponent },
      { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule), data: {oPermission: {permissionId: 'students-permission', restrictedPermissionsRedirect: '/main/home'}} },
      { path: 'tutors', loadChildren: () => import('./tutors/tutors.module').then(m => m.TutorsModule), data: {oPermission: {permissionId: 'tutor-permission', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'data', loadChildren: () => import('./data/data.module').then(m => m.DataModule), data: {oPermission: {permissionId: 'data-permission', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'commercial', loadChildren: () => import('./commercial/commercial.module').then(m => m.CommercialModule), data: {oPermission: {permissionId: 'commercial-permission', restrictedPermissionsRedirect: '/main/home'}}},
      { path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule), data: {oPermission: {permissionId: 'config-permission', restrictedPermissionsRedirect: '/main/home'}}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
