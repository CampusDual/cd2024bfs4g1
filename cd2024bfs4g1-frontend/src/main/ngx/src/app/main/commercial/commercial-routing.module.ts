import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialSectionComponent } from './commercial-section/commercial-section.component';

const routes: Routes = [
  { path:'', pathMatch:'full', component: CommercialSectionComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule { }
