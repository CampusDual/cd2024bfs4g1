import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialRoutingModule } from './commercial-routing.module';
import { CommercialSectionComponent } from './commercial-section/commercial-section.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [
    CommercialSectionComponent
  ],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    RouterOutlet,
    MatIconModule,
    OntimizeWebModule,
  ]
})
export class CommercialModule { }
