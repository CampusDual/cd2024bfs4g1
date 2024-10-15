import { Component } from '@angular/core';

@Component({
  selector: 'app-student-bootcamp-prueba',
  templateUrl: './student-bootcamp-prueba.component.html',
  styleUrls: ['./student-bootcamp-prueba.component.css']
})
export class StudentBootcampPruebaComponent {

  // Datos que se mostrarán en el comboBox (estáticos en este caso)
  staticData = [
    { key: '1', value: 'USA' },
    { key: '2', value: 'Canada' },
    { key: '3', value: 'Mexico' },
    { key: '4', value: 'Spain' },
    { key: '5', value: 'France' }
  ]
  valueMultiple: string[];


  constructor() {
    setTimeout(() => {
      this.valueMultiple = ['1', '3'];
    });
  }



}
