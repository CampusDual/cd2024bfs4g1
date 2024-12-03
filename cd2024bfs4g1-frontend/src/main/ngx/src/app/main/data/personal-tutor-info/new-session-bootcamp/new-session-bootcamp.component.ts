import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-new-session-bootcamp',
  templateUrl: './new-session-bootcamp.component.html',
  styleUrls: ['./new-session-bootcamp.component.css']
})
export class NewSessionBootcampComponent {
  @ViewChild("newSessionPopup") newSessionPopup:OFormComponent;
  addNewSession(){
    this.newSessionPopup.insert();
    this.newSessionPopup.closeDetail();
  }

}
