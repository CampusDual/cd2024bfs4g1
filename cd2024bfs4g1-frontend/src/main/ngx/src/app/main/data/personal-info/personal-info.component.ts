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

  ngOnInit() {


    this.mainService.getUserInfo().subscribe((result: ServiceResponse) => {
      this.inputStudentId.setValue(result.data.user_id);
      this.getStudentData(result.data);

      this.oUserInfoService.setUserInfo({
        username: result.data['usr_login'],
        avatar: "data:image/png;base64," + result.data['usr_photo']
      });
    });
    
  }
  

  getStudentData(userData){
    if(userData.hasOwnProperty('usr_id') && this.service !== null){
      const filter = {
        'user_id': userData['usr_id']
      };

      const columns = ['id','name', 'surname1', 'surname2', 'dni', 'phone',
        'birth_date', 'location', 'campus_email', 'personal_email', 'fct_school', 'tutor_name_surname',
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
    if (!this.UsrPhoto || !event) {
      console.warn('onImageChange: UsrPhoto o evento no definido.');
      return;
    }

    const base64String = event; 
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = this.UsrPhoto.currentFileName?.split('.').pop()?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      return;
    }

    this.oUserInfoService.setUserInfo({
      ...this.oUserInfoService.getUserInfo(),
      avatar: `data:image/png;base64,${base64String}`
    });

    console.log('Miniatura actualizada en el encabezado.');

    setTimeout(() => {
      this.UsrPhoto.setValue(base64String);
      console.log('Imagen actualizada en el formulario.');
    }, 100); 
  }
  

  showAlert() {
    if (this.dialogService) {
      this.dialogService.error('Error de tipo de archivo', 'Por favor, sube una imagen con extensión .jpg, .jpeg .png o .gif');
    }
  }
}



