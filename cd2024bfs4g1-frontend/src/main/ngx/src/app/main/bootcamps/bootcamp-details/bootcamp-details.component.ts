import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bootcamp-details',
  templateUrl: './bootcamp-details.component.html',
  styleUrls: ['./bootcamp-details.component.css']

})
export class BootcampDetailsComponent {

  constructor(private router:Router){

  }

volver(e :any){
console.log (e + "Hola UwU")
this.router.navigate(['./main/bootcamps']);

    }
}
