import { Component, Injector, ViewChild } from '@angular/core';
import { OFormComponent, OntimizeService, OTextInputComponent } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import spainComunitys from 'src/app/main/students/spaincomunitys';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent {
  @ViewChild("idNumber") idNumber: OTextInputComponent;
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));
  protected service: OntimizeService;
  protected injector: Injector;

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar


  constructor(private router: Router, public location: Location) {
    this.validatorsArray.push(this.dateValidator);
    this.service = this.injector.get(OntimizeService);
    this.configureService();
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('documents');
    this.service.configureService(conf);
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};

    if (control && control.parent && control.value) {
      let enddate = control.value.valueOf();
      let startdate = control.parent.value.fct_start;

      if (enddate && startdate && enddate < startdate) {
        result['wrongendate'] = true;
      }
    }

    return result;
  }


  throwChange(enddate: ODateInputComponent) {
    enddate.getControl().updateValueAndValidity();
  }
  throwChange2(startdate: ODateInputComponent) {
    startdate.getControl().updateValueAndValidity();
  }

  mostrarBoton: boolean = true; ngOnInit() {
    this.mostrarBoton = /\d+$/.test(this.router.url);
  }

  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  getFileData() {
    console.log(this.idNumber);
    if (this.idNumber){
      return { student_id: this.idNumber.getValue() };
    }else{
      return null;
    }



  }


  onUploadFiles(event) {
    console.log(event);
  }

  onFileUpload() {

  }

  onError(event) {
 
    if (event.status === 507) {
      this.showError(event);
    }

  }
  showError(event: any) {
    console.log(event);
  }
/*
  // Método para manejar el evento de clic en la acción
  actionClick(event) {
    // Se realiza una consulta al servicio personalDocumentService para obtener los datos del archivo correspondiente al evento de clic.
    this.service.query({ id: event.id }, ['name', 'base64'], 'myPersonalFilesContent').subscribe(res => {
      if (res.data && res.data.length) {
        // Si se encuentran datos, se extrae el nombre del archivo y el contenido en base64.
        let filename = res.data[0].name;
        let base64 = res.data[0].base64;
        // Se crea un enlace temporal para descargar el archivo.
        const src = data:text/csv;base64,${base64};
        const link = document.createElement("a");
        link.href = src;
        link.download = filename;
        link.click();
        link.remove();
      }
    });

  }

  // Método para manejar la ejecución de la acción desde el menú contextual
  onExecute(event: any) {
    // Se realiza una consulta al servicio personalDocumentService para obtener los datos del archivo correspondiente a la acción ejecutada.
    this.service.query({ id: event.id }, ['name', 'base64'], 'myPersonalFilesContent').subscribe(res => {
      if (res.data && res.data.length) {
        // Si se encuentran datos, se extrae el nombre del archivo y el contenido en base64.
        let filename = res.data[0].name;
        let base64 = res.data[0].base64;
        // Se crea un enlace temporal para descargar el archivo.
        const src = data:text/csv;base64,${base64};
        const link = document.createElement("a");
        link.href = src;
        link.download = filename;
        link.click();
        link.remove();
      }
    });
  }*/

}
