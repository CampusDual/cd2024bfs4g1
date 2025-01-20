import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteshomeComponent } from './routeshome/routeshome.component';
import { RoutesNewComponent } from './routes-new/routes-new.component';
import { RoutesEditComponent } from './routes-edit/routes-edit.component';

const routes: Routes = [
  { path: '', component: RouteshomeComponent },
  { path: 'new', component: RoutesNewComponent },
  { path: ':id', component: RoutesEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
