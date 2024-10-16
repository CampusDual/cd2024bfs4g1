import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-bootcamp-list',
  templateUrl: './bootcamp-list.component.html',
  styleUrls: ['./bootcamp-list.component.css']
})
export class BootcampListComponent {

  constructor(private router:Router){}

nuevo(e :any){
this.router.navigate(['./main/bootcamps/bootcamp/new']);
    }
detalles(e: Event) {

}

}
