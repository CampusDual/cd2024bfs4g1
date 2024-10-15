import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentBootcampPruebaComponent } from './student-bootcamp-prueba/student-bootcamp-prueba.component'; // Importa el componente



const routes: Routes = [
  { path: '', pathMatch : 'full',component: StudentBootcampPruebaComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentBootRoutingModule { }
