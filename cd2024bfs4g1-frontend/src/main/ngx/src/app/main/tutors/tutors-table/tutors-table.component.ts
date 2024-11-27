import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-tutors-table',
  templateUrl: './tutors-table.component.html',
  styleUrls: ['./tutors-table.component.css']
})
export class TutorsTableComponent {
  detailId !: Number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  @ViewChild('tableTutors') tableComponent: OTableComponent;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      const tutorId = params['tutorId'];
      if (tutorId) {
        this.detailId = tutorId;
      }
    });
  }

  goToDetail() {
    if (this.detailId) {
      this.tableComponent.viewDetail({ id: this.detailId });

    }


  }

}
