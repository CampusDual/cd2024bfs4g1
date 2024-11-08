import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootcampsRoutingModule } from './bootcamps-routing.module';
import { BootcampDetailsComponent } from './bootcamp-details/bootcamp-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { BootcampListComponent } from './bootcamp-list/bootcamp-list.component';
import { StudentBootcampAddComponent } from './bootcamp-details/student-bootcamp-add/student-bootcamp-add.component';
import { BootcampNewComponent } from './bootcamp-new/bootcamp-new.component';
import { StudentBootcampDetailComponent } from './bootcamp-details/student-bootcamp-detail/student-bootcamp-detail.component';



@NgModule({
  declarations: [
    BootcampListComponent,
    BootcampDetailsComponent,
    StudentBootcampAddComponent,
    BootcampNewComponent,
    StudentBootcampDetailComponent,

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    BootcampsRoutingModule
  ]
})
export class BootcampsModule { }
