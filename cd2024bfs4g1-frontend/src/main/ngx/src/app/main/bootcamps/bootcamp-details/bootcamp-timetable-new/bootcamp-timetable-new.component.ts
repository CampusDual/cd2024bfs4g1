
import { Component, ViewChild } from '@angular/core';
import moment from 'moment';
import { ODateInputComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bootcamp-timetable-new',
  templateUrl: './bootcamp-timetable-new.component.html',
  styleUrls: ['./bootcamp-timetable-new.component.css']
})
export class BootcampTimetableNewComponent {



  @ViewChild("bootcampTimetableForm") bootcampTimetableForm:OFormComponent;
  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;
  @ViewChild("startDateBootcamp") startDateBootcamp: ODateInputComponent;
  @ViewChild("endDateBootcamp") endDateBootcamp: ODateInputComponent;


  public selected = {};
  $event: any;




  addTimetableBootcamp() {
      this.bootcampTimetableForm.insert();
      this.bootcampTimetableForm.closeDetail();
  }


  navigateBack() {
    window.history.back();
  }



  inicialDR() {
    const startDateValue = this.startDateBootcamp.getValue();
    const endDateValue = this.endDateBootcamp.getValue();

    const startMoment = moment(startDateValue).local();
    const endMoment = moment(endDateValue).local();

    this.selected = {
      startDate: startMoment,
      endDate: endMoment
    };

    this.bootcampTimetableForm.setFieldValue("dateRangeBootcamp", this.selected);
  }

  throwChange($event: any) {

      let startDate = moment($event.newValue.startDate).local();
      let endDate = moment($event.newValue.endDate).local();

      this.bootcampTimetableForm.setFieldValue("day_start", startDate);
      this.bootcampTimetableForm.setFieldValue("day_end", endDate);

  }

}









