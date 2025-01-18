import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-menu-new',
  templateUrl: './menu-new.component.html',
  styleUrls: ['./menu-new.component.css']
})
export class MenuNewComponent {
  @ViewChild('formenu') formenu:OFormComponent;
  insertMenu(){
      this.formenu.insert();
      this.formenu.closeDetail();
  }
}
