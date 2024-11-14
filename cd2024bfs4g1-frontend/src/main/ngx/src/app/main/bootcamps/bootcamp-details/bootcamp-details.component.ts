import { Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { OValidators } from 'ontimize-web-ngx';
import moment from 'moment';
import { ODateInputComponent, ODateRangeInputComponent, OFormComponent, OntimizeService, OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bootcamp-details',
  templateUrl: './bootcamp-details.component.html',
  styleUrls: ['./bootcamp-details.component.css']

})
export class BootcampDetailsComponent {
  @ViewChild('bootcampDetailForm') bootcampDetailForm:OFormComponent;
  months: Date[] = [];

  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    protected injector: Injector,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private translateService: OTranslateService) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
    this.service = this.injector.get(OntimizeService);
    this.configureService();
    this.dateClass.bind(this);
    this._locale = this.translateService.getCurrentLang();
    this._adapter.setLocale(this._locale);
    translateService.onLanguageChanged.subscribe((lan) => {
      this._locale = lan;
      this._adapter.setLocale(this._locale);
      this._adapter.setLocale(this._locale);
    });
  }
  goToStudentDetail(event: any) {
    const studentId = event.student_id;
    this.router.navigate(['/main/students', studentId])
  }

  volver(e) {
    this.router.navigate(['./main/bootcamps']);
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};

    if (control && control.parent && control.value) {
      let enddate = control.value.valueOf();
      let startdate = control.parent.value.start_date;

      if (enddate && startdate && enddate < startdate) {
        result['wrongendate'] = true;
      }
    }

    return result;
  }

  inicialDR() {
    const startDateValue = this.startDateInput.getValue();
    const endDateValue = this.endDateInput.getValue();

    const startMoment = moment(startDateValue).local();
    const endMoment = moment(endDateValue).local();

    this.selectedDateRange = {
      startDate: startMoment,
      endDate: endMoment
    };

    this.bootcampDetailForm.setFieldValue("dateRangeBootcampDetail", this.selectedDateRange);
  }


  throwChange($event: any) {

    let startDate = moment($event.newValue.startDate).local();
    let endDate = moment($event.newValue.endDate).local();

    this.bootcampDetailForm.setFieldValue("start_date", startDate);
    this.bootcampDetailForm.setFieldValue("end_date", endDate);

}
  // throwChange(enddate: ODateInputComponent) {
  //   enddate.getControl().updateValueAndValidity();
  // }
 // throwChange2(startdate: ODateInputComponent) {
   // startdate.getControl().updateValueAndValidity();
 // }

  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;
  @ViewChild("dateRange") dateRange: ODateRangeInputComponent;

  selected = false;
  startAtDate: Date;
  protected service: OntimizeService;
  public selectedDateRange = {};



  ngOnInit() { }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('bootcamps');
    this.service.configureService(conf);
  }

  onBootcampChange(event: any) {
    const bootcampId = event.id;
    const filter = { id: bootcampId };

    this.service.query(filter, ['id', 'start_date', 'end_date'], 'bootcamp').subscribe(resp => {
      if (resp.code === 0 && resp.data.length > 0) {
        const bootcamp = resp.data[0];
        const startDate = new Date(bootcamp.start_date);
        const endDate = new Date(bootcamp.end_date);

        this.startDateInput.setValue(startDate);
        this.endDateInput.setValue(endDate);
        this.startAtDate = startDate;
        this.generateMonths(startDate, endDate);
        this.selected = true;

      } else {
        alert('No se encontraron datos para este bootcamp.');
      }
    });
    this.selected = false;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view) => {
    let date: Date = new Date(cellDate);
    let startDate: Date = this.startDateInput.getValue();
    let endDate: Date = this.endDateInput.getValue();
    if (view === "month") {
      if (startDate && endDate && date >= startDate && date <= endDate) {
        if (startDate.toString() == date.getTime().toString()) {
          return "calendarcellStart";
        } else if (endDate.toString() == date.getTime().toString()) {
          return "calendarcellEnd";
        } else {
          return "calendarcell";
        }
      }
    }
    return '';
  };


  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }

  generateMonths(startDate: Date, endDate: Date) {
    this.months = [];
    const current = new Date(startDate);
    current.setDate(1);
    while (current <= endDate) {
      this.months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
  }

}
