import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OFormComponent, OntimizeService, OTextInputComponent, ServiceResponse } from 'ontimize-web-ngx';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-personal-tutor-info',
  templateUrl: './personal-tutor-info.component.html',
  styleUrls: ['./personal-tutor-info.component.css']
})
export class PersonalTutorInfoComponent {
  @ViewChild("userId") inputTutorId: OTextInputComponent;
  @ViewChild("form") form: OFormComponent;

  mainInfo: any = {};
  protected service: OntimizeService;

  constructor(protected injector: Injector, private mainService: MainService,private router: Router) {
    this.service= this.injector.get(OntimizeService);
    this.configureService();
  }
  goToDetail(event: any) {
    const bootcampId = event.bootcamp_id;
    console.log('/main/data/tutor'+bootcampId)
    this.router.navigate(['/main/data/tutor', bootcampId])
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

}
