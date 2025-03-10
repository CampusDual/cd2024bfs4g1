import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ODateInputComponent, OntimizeService, OUserInfoService } from 'ontimize-web-ngx';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;

  selected = false;
  startAtDate: Date;
  protected service: OntimizeService;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected injector: Injector,
    private oUserInfoService:OUserInfoService,
    private mainService: MainService,
    private domSanitizer:DomSanitizer
  ) {
    this.service = this.injector.get(OntimizeService);
    this.configureService();
    //this.dateClass.bind(this);
  }

  configureHolidaysService(){
    const conf = this.service.getDefaultServiceConfiguration('holidays');
    this.service.configureService(conf);
  }

  ngOnInit() {
    this.mainService.getUserInfo().subscribe(result=>{
     this.oUserInfoService.setUserInfo({
       username: result.data['usr_login'],
       avatar: "data:image/png;base64,"+result.data['usr_photo']
  
    });
    });
  
   }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('bootcamps');
    this.service.configureService(conf);
  }

  onBootcampChange(event: any) {
    const bootcampId = event.newValue;
    const filter = { id: bootcampId };

    this.service.query(filter, ['id', 'start_date', 'end_date'], 'bootcamp').subscribe(resp => {
      if (resp.code === 0 && resp.data.length > 0) {
        const bootcamp = resp.data[0];
        const startDate = new Date(bootcamp.start_date);
        const endDate = new Date(bootcamp.end_date);

        this.startDateInput.setValue(startDate);
        this.endDateInput.setValue(endDate);
        this.startAtDate = startDate;
        this.selected = true;

      } else {
        alert('No se encontraron datos para este bootcamp.');
      }
    });
    this.selected = false;
  }

  loadHolidays(){
    this.service.query()
  }

  

  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view) => {
  //   let date: Date = new Date(cellDate);
  //   let startDate: Date = this.startDateInput.getValue();
  //   let endDate: Date = this.endDateInput.getValue();
  //   if (view === "month") {
  //     if (startDate && endDate && date >= startDate && date <= endDate) {
  //       if (startDate.toString() == date.getTime().toString()) {
  //         return "calendarcellStart";
  //       } else if (endDate.toString() == date.getTime().toString()) {
  //         return "calendarcellEnd";
  //       } else {
  //         return "calendarcell";
  //       }
  //     }
  //   }
  //   return '';
  // };


  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }
}
