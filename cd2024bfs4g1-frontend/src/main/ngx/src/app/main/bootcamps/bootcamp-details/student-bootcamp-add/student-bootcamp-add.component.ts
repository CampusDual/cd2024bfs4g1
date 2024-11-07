import { Component, ViewChild } from '@angular/core';
import moment from 'moment';
import { ODateInputComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-student-bootcamp-add',
  templateUrl: './student-bootcamp-add.component.html',
  styleUrls: ['./student-bootcamp-add.component.css']
})

export class StudentBootcampAddComponent {


  @ViewChild('studentBootcampForm') studentBootcampForm:OFormComponent;
  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;


  public selected = {};
  $event: any;


 

  addStudentBootcamp() {
      this.studentBootcampForm.insert();
  }


  navigateBack() {
    window.history.back();
  }

  candidate(){
    this.studentBootcampForm.setFieldValue("status","Candidato")
  }
 

  inicialDR() {
    const startDateValue = this.startDateInput.getValue();
    const endDateValue = this.endDateInput.getValue();
  
    const startMoment = moment(startDateValue).local();  
    const endMoment = moment(endDateValue).local();      
  
    this.selected = {
      startDate: startMoment,
      endDate: endMoment
    };
  
    this.studentBootcampForm.setFieldValue("dateRangeBootcamp", this.selected);
  }
  

  
  
  


}
