import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuhomeComponent } from './menuhome/menuhome.component';
import { MenuNewComponent } from './menu-new/menu-new.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

const routes: Routes = [
  { path: '', component: MenuhomeComponent },
  { path: 'new', component: MenuNewComponent },
  { path: ':id', component: MenuEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
