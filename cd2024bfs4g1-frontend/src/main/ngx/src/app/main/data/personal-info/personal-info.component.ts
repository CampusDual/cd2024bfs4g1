import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { OntimizeService, OTextInputComponent, ServiceResponse } from 'ontimize-web-ngx';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  student: any = {};
  userId: number;

  @ViewChild("userId") inputId: OTextInputComponent;



  mainInfo: any = {};
  protected service: OntimizeService;


  name: String;
  surname1: String;
  surname2: String;
  dni: String;
  phone: String;
  employmentStatus: number;
  birthDate: Date;
  location: String;
  campusEmail: String;
  personalEmail: String;
  fctSchool: String;
  tutor: String;
  fctStart: Date;
  fctEnd: Date;
  udemy: boolean;
  githubUser: String;
  user_id: number;






  constructor(protected injector: Injector, private mainService: MainService) {
    this.service= this.injector.get(OntimizeService);
  }


  ngOnInit(){
    this.configureService();
    
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
        this.userId = result.data.user_id;
        this.inputId.setValue(this.userId);
        this.mainInfo = result.data;
        this.getMovements(this.mainInfo);
    })
  }

  protected configureService(){
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

  getMovements(data){
    if(data.hasOwnProperty('usr_id') && this.service !== null){
      const filter = {
        'user_id': data['usr_id']
      };

      const columns = ['name', 'surname1', 'surname2', 'dni', 'phone', 'employment_status_id',
        'birth_date', 'location', 'campus_email', 'personal_email', 'fct_school', 'tutor',
        'fct_start', 'fct_end', 'udemy', 'github_user','user_id'
      ];

      this.service.query(filter, columns, 'student').subscribe(resp => {
        if(resp.code == 0){




          this.name = resp.data[0].name;
          this.surname1 = resp.data[0].surname1;
          this.surname2 = resp.data[0].surname2;
          this.dni = resp.data[0].dni;
          this.phone = resp.data[0].phone;
          this.employmentStatus = resp.data[0].employment_status; 
          this.birthDate = resp.data[0].birth_date; 
          this.location = resp.data[0].location; 
          this.campusEmail = resp.data[0].campus_email; 
          this.personalEmail = resp.data[0].personal_email; 
          this.fctSchool = resp.data[0].fct_school; 
          this.tutor = resp.data[0].tutor; 
          this.fctStart = resp.data[0].fct_start; 
          this.fctEnd = resp.data[0].fct_end; 
          this.udemy = resp.data[0].udemy; 
          this.githubUser = resp.data[0].github_user;


          
        }else{
          alert('Error en query');
        }
      })
    }
  }


}



