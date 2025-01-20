import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-routes-new',
  templateUrl: './routes-new.component.html',
  styleUrls: ['./routes-new.component.css']
})
export class RoutesNewComponent {
  @ViewChild('formroute') formroute:OFormComponent;
  insertRoute(){
      this.formroute.insert();
      this.formroute.closeDetail();
  }
}
