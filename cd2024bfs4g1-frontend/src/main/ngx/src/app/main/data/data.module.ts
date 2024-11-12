import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PersonalInfoComponent } from './personal-info/personal-info.component';




@NgModule({
  declarations: [
    PersonalInfoComponent

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    DataRoutingModule
  ]
})
export class DataModule { }