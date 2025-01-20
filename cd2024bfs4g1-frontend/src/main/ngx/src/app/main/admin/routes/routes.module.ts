import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RouteshomeComponent } from './routeshome/routeshome.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { RoutesEditComponent } from './routes-edit/routes-edit.component';
import { RoutesNewComponent } from './routes-new/routes-new.component';


@NgModule({
  declarations: [
    RouteshomeComponent,
    RoutesEditComponent,
    RoutesNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
