import { Component, ViewChild } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent {
  @ViewChild('formmenu') formenu:OFormComponent;
  updateMenu(){
      this.formenu.update();
      this.formenu.closeDetail();
  }
}
