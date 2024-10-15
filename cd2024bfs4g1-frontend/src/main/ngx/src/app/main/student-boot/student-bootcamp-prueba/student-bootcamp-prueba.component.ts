import { Component } from '@angular/core';

@Component({
  selector: 'app-student-bootcamp-prueba',
  templateUrl: './student-bootcamp-prueba.component.html',
  styleUrls: ['./student-bootcamp-prueba.component.css']
})
export class StudentBootcampPruebaComponent {
  dataArray = [
    { key: 'US', value: 'United States' },
    { key: 'CA', value: 'Canada' },
    { key: 'MX', value: 'Mexico' },
    { key: 'FR', value: 'France' },
    { key: 'DE', value: 'Germany' }
  ];

 
  valueMultiple = [];  


}
