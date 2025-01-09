import { Component, ViewChild } from '@angular/core';
import { OTextInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-attendance-status-details',
  templateUrl: './attendance-status-details.component.html',
  styleUrls: ['./attendance-status-details.component.css']
})
export class AttendanceStatusDetailsComponent {

  @ViewChild("colorselecionado") colorselecionado: OTextInputComponent;
  selectedColor: any;

  cargarColor() {
    this.selectedColor=this.colorselecionado.getValue();
  }
}
