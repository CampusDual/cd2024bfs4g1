import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OntimizeWebModule, OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-config-tables',
  templateUrl: './config-tables.component.html',
  styleUrls: ['./config-tables.component.css']
})
export class ConfigTablesComponent {
  @ViewChild('studentStatusTable') studentStatusTable: OTableComponent;
  @ViewChild('employmentStatusTable') employmentStatusTable: OTableComponent;
  onRowStatusDeleted($event: any) {
    //this.studentStatusTable.refresh();
    console.log("BORRO");
  }
  onRowEmploymentStatusDeleted($event: any) {
    //this.employmentStatusTable.refresh();
    console.log("BORRO");
  }
  prueba() {
    console.log("Borro FALLO");
  }


}
