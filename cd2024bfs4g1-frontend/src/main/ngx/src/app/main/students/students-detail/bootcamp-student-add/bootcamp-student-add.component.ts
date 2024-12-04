import { Location } from '@angular/common';
import { Component, Injector, ViewChild } from '@angular/core';
import moment from 'moment';
import { ODateInputComponent, OFormComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bootcamp-student-add',
  templateUrl: './bootcamp-student-add.component.html',
  styleUrls: ['./bootcamp-student-add.component.css']
})
export class BootcampStudentAddComponent {
  @ViewChild('studentBootcampForm') studentBootcampForm:OFormComponent;
  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;


 

  public selected = {};
  $event: any;

  addStudentBootcamp() {
      this.studentBootcampForm.insert();
      this.studentBootcampForm.closeDetail();
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

  throwChange($event: any) {

      let startDate = moment($event.newValue.startDate).local();  
      let endDate = moment($event.newValue.endDate).local();
  
      this.studentBootcampForm.setFieldValue("start_date", startDate);
      this.studentBootcampForm.setFieldValue("end_date", endDate);
    
  }
  // onBootcampChange(event: any) {
  // this.bootcampTable.refresh();
  // this.configureBootcamps();
  // const bootcampId = event.id;
  // const filter = { id: bootcampId };

  // this.service.query(filter, ['id', 'start_date', 'end_date'], 'bootcamp').subscribe(resp => {
  //   if (resp.code === 0 && resp.data.length > 0) {
  //     const bootcamp = resp.data[0];
  //     const startDate = new Date(bootcamp.start_date);
  //     const endDate = new Date(bootcamp.end_date);

  //     this.startDateInput.setValue(startDate);
  //     this.endDateInput.setValue(endDate);
  //     this.startAtDate = startDate;
  //     this.selected = true;

  //   } else {
  //     alert('No se encontraron datos para este bootcamp.');
  //   }
  // });
  // this.selected = false;
// }

}

