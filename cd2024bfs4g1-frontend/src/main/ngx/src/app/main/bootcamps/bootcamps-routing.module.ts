import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampsDetailsComponent } from './bootcamps-details/bootcamps-details.component';

const routes: Routes = [
  {path: 'bootcamps/:ID',component: BootcampsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampsRoutingModule { }
