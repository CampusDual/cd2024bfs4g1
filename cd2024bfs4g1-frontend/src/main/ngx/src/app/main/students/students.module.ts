import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsNewComponent } from './students-new/students-new.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { StudentsTableComponent } from './students-table/students-table.component';
import { BootcampStudentAddComponent } from './students-detail/bootcamp-student-add/bootcamp-student-add.component';
import{MatIconModule} from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EmploymentHistoryNewComponent } from './students-detail/employment-history-new/employment-history-new.component';
import { EmploymentHistoryDetailsComponent } from './students-detail/employment-history-details/employment-history-details.component';


@NgModule({
  declarations: [
    StudentsDetailComponent,
    StudentsNewComponent,
    StudentsTableComponent,
    BootcampStudentAddComponent,
    EmploymentHistoryNewComponent,
    EmploymentHistoryDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    OntimizeWebModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Registrar el ícono SVG 'thumb-up'
    this.matIconRegistry.addSvgIcon(
      'warning', // Nombre del ícono
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/warning.svg') // Ruta al archivo SVG
    );
  }
}
