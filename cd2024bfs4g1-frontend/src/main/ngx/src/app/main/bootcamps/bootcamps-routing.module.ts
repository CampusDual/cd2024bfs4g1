import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';

const routes: Routes = [
  {path:'', component: BootcampDetailsComponent},
  {path: 'bootcamps/:id',component: BootcampsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
