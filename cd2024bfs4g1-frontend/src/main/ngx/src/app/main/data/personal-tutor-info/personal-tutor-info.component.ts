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
  @ViewChild("tutorsPhoto") UsrPhoto: OImageComponent;
  isUpdatingImage: boolean = false;
  isUpdateOtherFile: boolean = false;
  mainInfo: any = {};
  protected service: OntimizeService;

  constructor(protected injector: Injector, private mainService: MainService, private router: Router, protected dialogService: DialogService, private oUserInfoService: OUserInfoService) {
    this.service = this.injector.get(OntimizeService);
    this.configureService();
  }
  goToDetail(event: any) {
    const bootcampId = event.bootcamp_id;
    this.router.navigate(['/main/data/tutor', bootcampId]);

  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('tutors');
    this.service.configureService(conf);
  }

  ngOnInit() {
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) => {
      this.inputTutorId.setValue(result.data.user_id);
      this.getTutorData(result.data);
      
    });

    this.mainService.getUserInfo().subscribe(result => {
      this.oUserInfoService.setUserInfo({
        username: result.data['usr_login'],
        avatar: "data:image/png;base64," + result.data['usr_photo']
      });
    });
  }
  



  getTutorData(userData) {
    if (userData.hasOwnProperty('usr_id') && this.service !== null) {
      const filter = {
        'user_id': userData['usr_id']
      };

      const columns = ['id', 'name', 'surname1', 'surname2', 'email', 'user_id', 'usr_photo'
      ];

      this.service.query(filter, columns, 'tutor').subscribe(resp => {
        if (resp.code == 0) {
          this.form.setData(resp.data[0]);
        } else {
          alert('Error en query');
        }
      })
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit: UsrPhoto inicializado:', this.UsrPhoto);
  }

  onImageChange(event: any) {
    if (!this.UsrPhoto || !event) {
      console.warn('onImageChange: UsrPhoto o evento no definido.');
      return;
    }
  
    // Previene actualizaciones continuas
    if (this.isUpdatingImage) {
      console.warn('onImageChange: Actualización en curso.');
      return;
    }
  
    const base64String = event;
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = this.UsrPhoto.currentFileName?.split('.').pop()?.toLowerCase();
  
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      return;
    }
  
    this.isUpdatingImage = true; // Indica que estamos en proceso de actualización
  
    // Actualiza la miniatura en el encabezado
    this.oUserInfoService.setUserInfo({
      ...this.oUserInfoService.getUserInfo(),
      avatar: `data:image/png;base64,${base64String}`,
    });
  
  
    // Actualiza la imagen en el formulario
    this.UsrPhoto.setValue(base64String);
  
    // Utiliza un temporizador para garantizar que la bandera se restablezca
    setTimeout(() => {
      this.isUpdatingImage = false; // Finaliza el proceso de actualización
    }, 200); // Reduce el intervalo de actualización
  }
  



  showAlert() {
    if (this.dialogService) {
      this.dialogService.error('Error de tipo de archivo', 'Por favor, sube una imagen con extensión .jpg, .jpeg .png o .gif');
    }
  }

}
