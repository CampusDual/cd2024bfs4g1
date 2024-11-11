import { Component, OnInit, ViewChild } from '@angular/core';
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



  constructor(private mainService: MainService) {}


  ngOnInit(){
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
        this.studentId = result.data.student_id;
        this.inputId.setValue(this.studentId);
        this.mainInfo = result.data;

        this.name=result.data.name;
        this.surname1=result.data.surname1;
        this.surname2=result.data.surname2;
        this.dni=result.data.dni;
        this.phone=result.data.phone;





      /*this.studentId = result.data.student_id;
      this.inputId.setValue(this.studentId);
      this.mainInfo = result.data;
      this.dataLoaded();*/



    })
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
