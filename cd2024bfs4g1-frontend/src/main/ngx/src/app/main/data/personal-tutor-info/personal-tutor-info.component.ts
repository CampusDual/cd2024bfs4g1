import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, OFormComponent, OImageComponent, OntimizeService, OTextInputComponent, OUserInfoService, ServiceResponse } from 'ontimize-web-ngx';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-personal-tutor-info',
  templateUrl: './personal-tutor-info.component.html',
  styleUrls: ['./personal-tutor-info.component.css']
})
export class PersonalTutorInfoComponent {
  @ViewChild("userId") inputTutorId: OTextInputComponent;
  @ViewChild("form") form: OFormComponent;
  @ViewChild("tutorsPhoto") tutorsPhoto: OImageComponent;
  isUpdatingImage: boolean = false;
  isUpdateOtherFile: boolean = false;
  mainInfo: any = {};
  protected service: OntimizeService;

  constructor(protected injector: Injector, private mainService: MainService,private router: Router,protected dialogService: DialogService,private oUserInfoService:OUserInfoService) {
    this.service= this.injector.get(OntimizeService);
    this.configureService();
  }
  goToDetail(event: any) {
    const bootcampId = event.bootcamp_id;
    this.router.navigate(['/main/data/tutor', bootcampId]);
    
  }

  protected configureService(){
    const conf = this.service.getDefaultServiceConfiguration('tutors');
    this.service.configureService(conf);
  }

  ngOnInit(){
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
        this.inputTutorId.setValue(result.data.user_id);
        this.getTutorData(result.data);
    })
    this.mainService.getUserInfo().subscribe(result=>{
      this.oUserInfoService.setUserInfo({
        username: result.data['usr_login'],
        avatar: "data:image/png;base64,"+result.data['usr_photo']
   
     });
     });
  }

  getTutorData(userData){
    if(userData.hasOwnProperty('usr_id') && this.service !== null){
      const filter = {
        'user_id': userData['usr_id']
      };

      const columns = ['id','name', 'surname1', 'surname2', 'email', 'user_id','usr_photo'
      ];

      this.service.query(filter, columns, 'tutor').subscribe(resp => {
        if(resp.code == 0){
          this.form.setData(resp.data[0]);
        }else{
          alert('Error en query');
        }
      })
    }
  }
    onImageChange(event: any) {
    if (!event || !this.tutorsPhoto.currentFileName) {
      return;
    }

    if (this.isUpdatingImage) {
      return;
    }

    const base64String = event;
    const currentFileName = this.tutorsPhoto.currentFileName || '';

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = currentFileName.split('.').pop()?.toLowerCase();

    // Validar si el nombre del archivo o la extensión son inválidos
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      this.tutorsPhoto.setValue(''); // Limpia el valor del archivo
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

          this.oUserInfoService.setUserInfo({
            ...this.oUserInfoService.getUserInfo(),
            avatar:modifiedImageBase64
          })
          ctx.clearRect(0, 0, canvas.width, canvas.height); 
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
