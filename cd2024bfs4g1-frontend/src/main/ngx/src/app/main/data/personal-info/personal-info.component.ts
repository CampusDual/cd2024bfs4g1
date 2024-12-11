import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { DialogService, OFormComponent, OImageComponent, OntimizeService, OTextInputComponent, OUserInfoService, ServiceResponse } from 'ontimize-web-ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
openLink($event: any) {
throw new Error('Method not implemented.');
}

  @ViewChild("userId") inputStudentId: OTextInputComponent;
  @ViewChild("form") form: OFormComponent;
  @ViewChild("UsrPhoto") UsrPhoto: OImageComponent;
  isUpdatingImage: boolean = false;
  isUpdateOtherFile: boolean = false;
  mainInfo: any = {};
  protected service: OntimizeService;
  avatar: any

  constructor(protected injector: Injector,private router: Router, private mainService: MainService,protected dialogService: DialogService,private oUserInfoService: OUserInfoService) {
    this.service= this.injector.get(OntimizeService);
    this.configureService();
    
  }
  goToDetail(event: any) {
    const bootcampId = event.bootcamp_id;
    this.router.navigate(['/main/data/student', bootcampId]);
    
  }
  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

  ngOnInit(){
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
        this.inputStudentId.setValue(result.data.user_id);
        this.getStudentData(result.data);
    })

 this.mainService.getUserInfo().subscribe(result=>{
  this.oUserInfoService.setUserInfo({
    username: result.data['usr_login'],
    avatar: "data:image/png;base64,"+result.data['usr_photo']

 });
 });
 
  }

  getStudentData(userData){
    if(userData.hasOwnProperty('usr_id') && this.service !== null){
      const filter = {
        'user_id': userData['usr_id']
      };

      const columns = ['id','name', 'surname1', 'surname2', 'dni', 'phone', 'employment_status_id',
        'birth_date', 'location', 'campus_email', 'personal_email', 'fct_school', 'tutor',
        'fct_start', 'fct_end', 'udemy', 'github_user','user_id','usr_photo','employment_status'
      ];

      this.service.query(filter, columns, 'student').subscribe(resp => {
        if(resp.code == 0){
          this.form.setData(resp.data[0]);
        }else{
          alert('Error en query');
        }
      })
    }
  }
  onImageChange(event: any) {
    // Si no hay evento o el archivo no está definido, simplemente retorna
    if (!event || !this.UsrPhoto.currentFileName) {
      return;
    }

    if (this.isUpdatingImage) {
      return;
    }

    const base64String = event;
    const currentFileName = this.UsrPhoto.currentFileName || '';

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = currentFileName.split('.').pop()?.toLowerCase();

    // Validar si el nombre del archivo o la extensión son inválidos
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      this.showAlert(); // Muestra la alerta de error
      this.isUpdatingImage = true;
      this.UsrPhoto.setValue(''); // Limpia el valor del archivo
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
          this.UsrPhoto.setValue(modifiedImageBase64); // Actualiza la imagen redimensionada
          this.isUpdatingImage = false;

          ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
        }
      };

      img.onerror = () => {
        console.error('Error al cargar la imagen.');
      };
    }
  }

  showAlert() {
    if (this.dialogService) {
      this.dialogService.error('Error de tipo de archivo', 'Por favor, sube una imagen con extensión .jpg, .jpeg .png o .gif');
    }
  }


}



