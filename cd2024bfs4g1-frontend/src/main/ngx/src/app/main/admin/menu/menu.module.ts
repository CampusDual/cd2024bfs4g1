import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuhomeComponent } from './menuhome/menuhome.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    MenuhomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
