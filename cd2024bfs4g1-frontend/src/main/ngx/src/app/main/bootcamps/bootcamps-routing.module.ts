import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { StudentBootcampAddComponent } from './bootcamp-details/student-bootcamp-add/student-bootcamp-add.component';
import { BootcampNewComponent } from './bootcamp-new/bootcamp-new.component';

const routes: Routes = [
  //AQUI ES DONDE REDIRIGIMOS A LA LISTA SI ESTA VACIA

  {path:"",pathMatch:"full",component:BootcampListComponent},
  {path: 'new',component: BootcampNewComponent},
  {path: ':id',component: BootcampDetailsComponent},
  {path:':bootcamp_id/new', component: StudentBootcampAddComponent},
  {path:':bootcamp_id/:id', component: StudentBootcampAddComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
