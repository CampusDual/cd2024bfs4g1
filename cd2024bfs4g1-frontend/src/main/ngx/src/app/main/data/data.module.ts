import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalTutorInfoComponent } from './personal-tutor-info/personal-tutor-info.component';
import { BootcampStudentsTableComponent } from './personal-tutor-info/bootcamp-students-table/bootcamp-students-table.component';




@NgModule({
  declarations: [
    PersonalInfoComponent,
    PersonalTutorInfoComponent,
    BootcampStudentsTableComponent

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    DataRoutingModule
  ]
})
export class DataModule { }