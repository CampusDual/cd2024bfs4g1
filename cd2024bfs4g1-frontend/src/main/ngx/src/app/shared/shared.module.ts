import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { FilterComponent } from './components/filters/filters.component';
import { HomeToolbarComponent } from './components/home-toolbar/home-toolbar.component';
import { CalendarAttendanceComponent } from '../main/data/personal-tutor-info/calendar-attendance/calendar-attendance.component';
import { OTableCellRendererLinkComponent } from './components/o-table-cell-renderer-link/o-table-cell-renderer-link.component';


@NgModule({
  imports: [
    OntimizeWebModule
  ],
  declarations: [
    FilterComponent,
    HomeToolbarComponent,
    CalendarAttendanceComponent,
    OTableCellRendererLinkComponent
  ],
  exports: [
    CommonModule,
    FilterComponent,
    HomeToolbarComponent,
    CalendarAttendanceComponent,
    OTableCellRendererLinkComponent
  ]
})
export class SharedModule { }


