import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsTableComponent } from './students-table/students-table.component';

const routes: Routes = [
  { path:'', component: StudentsTableComponent} //TODO: cambiar ruta???
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
