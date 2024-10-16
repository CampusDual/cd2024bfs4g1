import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { BootcampNewComponent } from './bootcamp-new/bootcamp-new.component';

const routes: Routes = [
  //AQUI ES DONDE REDIRIGIMOS A LA LISTA SI ESTA VACIA
  {path:"",redirectTo:"list",pathMatch:"full"},
  {path:"list",component:BootcampListComponent},
  {path: 'bootcamp/new',component: BootcampNewComponent},
  {path: 'bootcamp/:id',component: BootcampDetailsComponent}
 

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
