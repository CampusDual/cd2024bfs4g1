import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuhomeComponent } from './menuhome/menuhome.component';

const routes: Routes = [
  { path: '', component: MenuhomeComponent },
  { path: 'new', component: MenuhomeComponent },
  { path: ':rol_id', component: MenuhomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
