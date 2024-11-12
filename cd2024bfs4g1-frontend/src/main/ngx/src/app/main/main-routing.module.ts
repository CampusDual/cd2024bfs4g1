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
      { path: 'bootcamps', loadChildren: () => import('./bootcamps/bootcamps.module').then(m => m.BootcampsModule), data: {oPermission: {permissionId: 'bootcamps', restrictedPermissionsRedirect: '/main/data'}} },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'profile', component: ProfileComponent },
      { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
      { path: 'data', loadChildren: () => import('./data/data.module').then(m => m.DataModule)}
      { path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
