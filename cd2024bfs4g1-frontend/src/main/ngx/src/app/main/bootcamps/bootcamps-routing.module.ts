import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';

const routes: Routes = [
  //AQUI ES DONDE REDIRIGIMOS A LA LISTA SI ESTA VACIA
  {path:"",redirectTo:"list",pathMatch:"full"},
  {path:"list",component:BootcampListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
