import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RouteshomeComponent } from './routeshome/routeshome.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    RouteshomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
