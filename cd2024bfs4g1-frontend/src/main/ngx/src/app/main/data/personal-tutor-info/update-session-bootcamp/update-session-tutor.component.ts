import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-update-session-tutor',
  templateUrl: './update-session-tutor.component.html',
  styleUrls: ['./update-session-tutor.component.css']
})
export class UpdateSessionTutorComponent {

  @ViewChild("updateSessionPopup") updateSessionPopup:OFormComponent;
  updateNewSession(){
    this.updateSessionPopup.update();
    this.updateSessionPopup.closeDetail();
  }

}
