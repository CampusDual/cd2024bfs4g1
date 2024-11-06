import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorsDetailComponent } from './tutors-detail/tutors-detail.component';
import { TutorsNewComponent } from './tutors-new/tutors-new.component';
import { TutorsTableComponent } from './tutors-table/tutors-table.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    TutorsDetailComponent,
    TutorsNewComponent,
    TutorsTableComponent
  ],
  imports: [
    CommonModule,
    TutorsRoutingModule,
    OntimizeWebModule
  ]
})
export class TutorsModule { }
