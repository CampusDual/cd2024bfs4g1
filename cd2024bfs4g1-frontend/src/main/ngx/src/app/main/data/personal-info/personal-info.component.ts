import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { OFormComponent, OntimizeService, OTextInputComponent, ServiceResponse } from 'ontimize-web-ngx';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  @ViewChild("userId") inputStudentId: OTextInputComponent;
  @ViewChild("form") form: OFormComponent;

  mainInfo: any = {};
  protected service: OntimizeService;

  constructor(protected injector: Injector, private mainService: MainService) {
    this.service= this.injector.get(OntimizeService);
    this.configureService();
  }

  protected configureService(){
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

  ngOnInit(){
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
        this.inputStudentId.setValue(result.data.user_id);
        this.getStudentData(result.data);
    })
  }

  getStudentData(userData){
    if(userData.hasOwnProperty('usr_id') && this.service !== null){
      const filter = {
        'user_id': userData['usr_id']
      };

      const columns = ['id','name', 'surname1', 'surname2', 'dni', 'phone', 'employment_status_id',
        'birth_date', 'location', 'campus_email', 'personal_email', 'fct_school', 'tutor',
        'fct_start', 'fct_end', 'udemy', 'github_user','user_id','usr_photo'
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

}



