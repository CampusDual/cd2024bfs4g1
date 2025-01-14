import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteshomeComponent } from './routeshome/routeshome.component';

const routes: Routes = [
  { path: '', component: RouteshomeComponent },
  { path: 'new', component: RouteshomeComponent },
  { path: ':rol_id', component: RouteshomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
