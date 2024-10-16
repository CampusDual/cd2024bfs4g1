import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bootcamp-new',
  templateUrl: './bootcamp-new.component.html',
  styleUrls: ['./bootcamp-new.component.css']
})
export class BootcampNewComponent {



  constructor(private router:Router){

  }

volver(e :any){
console.log (e + "Hola UwU")
this.router.navigate(['./main/bootcamps']);

    }

}
