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
  studentId: number;
  @ViewChild("studentId") inputId: OTextInputComponent;

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





  constructor(protected injector: Injector) {
    this.service= this.injector.get(OntimizeService);
  }


  ngOnInit(){
    this.configureService();
    
    /*this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
        this.studentId = result.data.student_id;
        this.inputId.setValue(this.studentId);
        this.mainInfo = result.data;

        this.name=result.data.name;
        this.surname1=result.data.surname1;
        this.surname2=result.data.surname2;
        this.dni=result.data.dni;
        this.phone=result.data.phone;*/


      
      
      
      /*this.studentId = result.data.student_id;
      this.inputId.setValue(this.studentId);
      this.mainInfo = result.data;
      this.dataLoaded();*/



    /*})*/
  }

  protected configureService(){
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

  getMovements(data){
    if(data.hasOwnProperty('usr_id') && this.service !== null){
      const filter = {
        'usr_id': data['usr_id']
      };

      const columns = ['name', 'surname1', 'surname2', 'dni', 'phone', 'employment_status',
        'birth_date', 'location', 'campus_email', 'personal_email', 'fct_school', 'tutor',
        'fct_start', 'fct_end', 'udemy', 'github_user'
      ];

      this.service.query(filter, columns, 'student').subscribe(resp => {
        if(resp.code == 0){
          this.name = resp.data[0].name;
          this.surname1 = resp.data[0].surname1;
          this.surname2 = resp.data[0].surname2;


        }else{
          alert('Error en query');
        }
      })
    }
  }

  dataLoaded(){
    const filter = {
      usr_id: this.studentId
    };
  }

  /*ngOnInit() {
    this.mainService.getUserInfo().subscribe(response => {
      if(response.data){
        this.studentId = response.data.student_id;
        this.inputId.setValue(this.studentId);
        this.student = response.data;
      }
    });
  }*/


}