import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-update-session-bootcamp',
  templateUrl: './update-session-bootcamp.component.html',
  styleUrls: ['./update-session-bootcamp.component.css']
})
export class UpdateSessionBootcampComponent {

  @ViewChild("updateSessionPopup") updateSessionPopup:OFormComponent;
  updateNewSession(){
    this.updateSessionPopup.update();
    this.updateSessionPopup.closeDetail();
  }

}
