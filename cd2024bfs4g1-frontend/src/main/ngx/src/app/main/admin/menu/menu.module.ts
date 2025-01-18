import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuhomeComponent } from './menuhome/menuhome.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MenuNewComponent } from './menu-new/menu-new.component';


@NgModule({
  declarations: [
    MenuhomeComponent,
    MenuEditComponent,
    MenuNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
