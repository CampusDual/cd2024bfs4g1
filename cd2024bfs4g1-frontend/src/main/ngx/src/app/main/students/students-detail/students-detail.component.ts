import { Component, Injector, ViewChild } from '@angular/core';
import { OFileInputComponent, OFormComponent, OntimizeService, OTableComponent, OTextInputComponent, OValidators } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import spainComunitys from 'src/app/main/students/spaincomunitys';
import EventEmitter from 'events';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent {
  @ViewChild("idNumber") idNumber: OTextInputComponent;
  @ViewChild("documentsTable") documentsTable: OTableComponent;
  @ViewChild("fileinput") fileinput: OFileInputComponent;
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsNewPasswordArray: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];
  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));
  protected service: OntimizeService;
  showNotice:boolean=false;

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar


  constructor(private router: Router, public location: Location, public injector: Injector) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/\d/, 'hasNumber'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[A-Z]/, 'hasCapitalCase'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[a-z]/, 'hasSmallCase'));
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
    this.service = this.injector.get(OntimizeService);
    this.configureService();
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('students');
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
    if (this.idNumber) {
      return { student_id: this.idNumber.getValue() };
    } else {
      return null;
    }
  }


  showMessage = false;

  onUploadFiles(event) {
    this.documentsTable.refresh();
    this.fileinput.clearValue();

    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  onFileUpload() {

  }

  onError(event) {

    if (event.status === 507) {
      this.showError("event");
    }

  }
  showError(event: any) {
    console.log(event);
  }
  // Método para manejar el evento de clic en la acción
  actionClick(event) {
    // Se realiza una consulta al servicio personalDocumentService para obtener los datos del archivo correspondiente al evento de clic.
    this.service.query({ id: event.id }, ['name', 'base64'], 'myPersonalFilesContent').subscribe(res => {
      if (res.data && res.data.length) {
        // Si se encuentran datos, se extrae el nombre del archivo y el contenido en base64.
        let filename = res.data[0].name;
        let base64 = res.data[0].base64;
        // Se crea un enlace temporal para descargar el archivo.
        const src = `data:text/csv;base64,${base64}`;
        const link = document.createElement("a");
        link.href = src;
        link.download = filename;
        link.click();
        link.remove();
      }
    });

  }
  refreshFileInput() {
    this.fileinput.clearValue();
  }
  mostrar(event: any) {

    console.log(event.srcElement.value);
    this.getDNI(event.srcElement.value);

  }

  getDNI(dni:string) {
    const filter = {
      'dni': dni
    };
    const columns = ['id'];
    this.service.query(filter, columns, 'student').subscribe(resp => {
      if (resp.code === 0){
        console.log('DNI encontrado:');
        console.log(resp.data.length);
        if(resp.data.length>1){
          this.showNotice=true;
        }else{
          this.showNotice=false;
        }
      } else {
        console.log(resp.message);
        this.showNotice=false;
      }
    });
}
}
