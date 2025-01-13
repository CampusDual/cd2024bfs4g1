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
  @ViewChild('tutorTypeTable') tutorTypeTable: OTableComponent;

  downloadCsvTemplate(): void {
    // generación de encabezados y contenido csv
    const headers = ['name','surname1','personal_email','dni','surname2','birth_date','phone','campus_email','spain_comunity','location'];
    const rows = [headers];
    const csvContent = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // creación de enlace del contenido
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'plantilla_estudiantes.csv');

    // se agrega el enlace al DOM
    document.body.appendChild(link);
    link.click();

    // se limpia el enlace
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

downloadCsvExample(): void {
  // generación de encabezados y aviso ejemplo csv
  const aviso = ['Plantilla de ejemplo. En caso de subir registros de estudiante se deben seguir las siguientes indicaciones mediante la plantilla facilitada.'];
  const salto = [' '];
  const headers = ['name','surname1','personal_email','dni','surname2','birth_date','phone','campus_email','spain_comunity','location'];
  const ex = ['Juan','Valdés','juanvaldes@hotmail.es','12345678Z','Carrera','1990-09-02','+34 988721241','juanvaldes@campusdual.es','Galicia','Vigo'];
  const rows = [aviso, salto, headers, salto, ex];
  const csvContent = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // creación de enlace del contenido
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', 'plantilla_estudiantes.csv');

  // se agrega el enlace al DOM
  document.body.appendChild(link);
  link.click();

  // se limpia el enlace
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
}
