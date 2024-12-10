import { Component,Injector, ViewChild } from '@angular/core';
import { DialogService, OFormComponent,OImageComponent,OntimizeService, OValidators } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import spainComunitys from 'src/app/main/students/spaincomunitys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-new',
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.css']
})
export class StudentsNewComponent {

  @ViewChild('studentsform') protected formStudents: OFormComponent;
  @ViewChild("UsrPhoto") UsrPhoto: OImageComponent;
  isUpdatingImage: boolean = false;
  isUpdateOtherFile: boolean = false;
  protected service: OntimizeService;
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsNewPasswordArray: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];
  showNotice: boolean =false;
valueSimple: any;
  


  constructor(protected injector: Injector,protected dialogService: DialogService, private router : Router) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/\d/, 'hasNumber'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[A-Z]/, 'hasCapitalCase'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[a-z]/, 'hasSmallCase'));
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
    this.service = this.injector.get(OntimizeService);
    this.configureService();
  }

  volver(e) {
    this.router.navigate(['./main/students']);
  }
 
  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));
  setcomunity(){

    this.formStudents.setFieldValue('spain_comunity','Galicia')
    
  }
  

  protected configureService() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

  insertStudent() {
    this.formStudents.insert();
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

  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
  mostrar(event: any) {

    
    this.getDNI(event.srcElement.value);

  }


getDNI(dni:string) {

    const filter = {
      'dni': dni
    };
    const columns = ['id'];
    this.service.query(filter, columns, 'student').subscribe(resp => {
        if(!resp.data.length){
          this.showNotice=false;
        }else{
          this.showNotice=true;
        }
    });

}

onImageChange(event: any) {

  if(event){
  if (this.isUpdatingImage) {
    return;
  }
  
  const base64String = event;
  const currentFileName = this.UsrPhoto.currentFileName; 


const validExtensions = ['jpg', 'jpeg', 'png', 'gif']; 
const fileExtension = currentFileName.split('.').pop()?.toLowerCase();

if (!validExtensions.includes(fileExtension)) {
  
  this.showAlert();
  
  this.isUpdatingImage = true; 
  this.UsrPhoto.setValue(''); 
  this.isUpdatingImage = false;
  return; 
}
  if (base64String) {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.src = `data:image/jpg;base64, ${base64String}`;
    img.onload = () => {
      if (ctx) {
        const newWidth = 200;
        const newHeight = 200;

        canvas.width = newWidth;
        canvas.height = newHeight;


        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const modifiedImageBase64 = canvas.toDataURL('image/jpg');


        this.isUpdatingImage = true;
        this.UsrPhoto.setValue(modifiedImageBase64);
        this.isUpdatingImage = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    img.onerror = () => {
      console.error('Error al cargar la imagen.');
    };
  }
}
}

showAlert() {
  if (this.dialogService) {
    this.dialogService.error('Error de tipo de archivo', 'Por favor, sube una imagen con extensión .jpg, .jpeg .png o .gif');
  }
}
goToLinkedIn() {
  window.open('https://www.linkedin.com/in/tu-perfil', '_blank');
}
}



