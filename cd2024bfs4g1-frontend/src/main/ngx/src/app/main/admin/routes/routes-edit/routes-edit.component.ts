import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-routes-edit',
  templateUrl: './routes-edit.component.html',
  styleUrls: ['./routes-edit.component.css']
})
export class RoutesEditComponent {
  @ViewChild('formroute') formroute:OFormComponent;
  updateRoute(){
      this.formroute.update();
      this.formroute.closeDetail();
  }
}
