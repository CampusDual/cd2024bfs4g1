import { Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, OFileInputComponent, OListComponent, OTableComponent, OTextInputComponent, OValidators } from 'ontimize-web-ngx';
import moment from 'moment';
import { ODateInputComponent, ODateRangeInputComponent, OFormComponent, OntimizeService, OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-bootcamp-details',
  templateUrl: './bootcamp-details.component.html',
  styleUrls: ['./bootcamp-details.component.css']

})
export class BootcampDetailsComponent {
  @ViewChild('bootcampDetailForm') bootcampDetailForm:OFormComponent;
  @ViewChild("idNumber") idNumber: OTextInputComponent;
  @ViewChild("documentsTable") documentsTable: OTableComponent;
  @ViewChild("fileinput") fileinput: OFileInputComponent;
  @ViewChild('studentsTable', { static: true }) studentsTable!: OTableComponent;

  months: Date[] = [];

  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    protected injector: Injector,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private translateService: OTranslateService,
    protected dialogService: DialogService
   ) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
    this.service = this.injector.get(OntimizeService);
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
    this.router.navigate([`/main/students/${studentId}`]);
  this.clearTableSelection();
  }

  goToTutorDetail(tutor: any) {
    const tutorId = tutor.tutor_id;
    this.router.navigate([`/main/tutors/${tutorId}`]);
  this.clearTableSelection();
  }
  // goToTutorDetail(tutor: any) {
  //   this.router.navigate(['/main/tutors', tutor.tutor_id]);
  // }
  clearTableSelection(): void {
    if (this.studentsTable) {
      this.studentsTable.clearSelection();
    }
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
  @ViewChild("list") list: OListComponent;

  selected = false;
  startAtDate: Date;
  protected service: OntimizeService;
  public selectedDateRange = {};



  ngOnInit() { }

  protected configureBootcamps() {
    const conf = this.service.getDefaultServiceConfiguration('bootcamps');
    this.service.configureService(conf);

  }

  protected configureDocuments() {
    const documentConf = this.service.getDefaultServiceConfiguration('documents');
    this.service.configureService(documentConf);
  }

  protected configureTutorsBootcamp() {
    const tutorBootcampConf = this.service.getDefaultServiceConfiguration('tutorBootcamps');
    this.service.configureService(tutorBootcampConf);
  }


  onBootcampChange(event: any) {
    this.studentsTable.refresh();
    this.configureBootcamps();
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
    if (view === "month") {
      let date = new Date(cellDate);
      date.setHours(0, 0, 0, 0);

      let startDate = this.startDateInput.getValue();
      let endDate = this.endDateInput.getValue();

      if (startDate) {
        startDate = new Date(startDate);
        startDate.setHours(0, 0, 0, 0);
      }
      if (endDate) {
        endDate = new Date(endDate);
        endDate.setHours(0, 0, 0, 0);
      }

      if (startDate && endDate && date >= startDate && date <= endDate) {
        if (date.getTime() === startDate.getTime()) {
          return "calendarcellStart";
        } else if (date.getTime() === endDate.getTime()) {
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

  getFileData() {
    if (this.idNumber) {
      return { bootcamp_id: this.idNumber.getValue() };
    } else {
      return null;
    }
  }


  showMessage = false;

  onUploadFiles(event) {
    this.documentsTable.refresh();
    this.fileinput.clearValue();

    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  onFileUpload() {

  }

  onError(event) {

    if (event.status === 507) {
      this.showError("event");
    }

  }
  showError(event: any) {
    console.log(event);
  }
  // Método para manejar el evento de clic en la acción
  actionClick(event) {
    this.configureDocuments();
    // Se realiza una consulta al servicio personalDocumentService para obtener los datos del archivo correspondiente al evento de clic.
    this.service.query({ id: event.id }, ['name', 'base64'], 'bootcampFilesContent').subscribe(res => {
      if (res.data && res.data.length) {
        // Si se encuentran datos, se extrae el nombre del archivo y el contenido en base64.
        let filename = res.data[0].name;
        let base64 = res.data[0].base64;
        // Se crea un enlace temporal para descargar el archivo.
        const src = `data:text/csv;base64,${base64}`;
        const link = document.createElement("a");
        link.href = src;
        link.download = filename;
        link.click();
        link.remove();
      }
    });

  }
  refreshFileInput() {
    this.fileinput.clearValue();
  }
  deleteTutorBootcamp(tutors: any) {

    this.configureTutorsBootcamp();
    this.dialogService.confirm('Confirm_dialog_title', 'Do_you_really_want_to_delete');
    this.dialogService.dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.delete({id: tutors.id}, 'tutorBootcamp').subscribe(res => {
          if (res.code === 0) {
            this.list.reloadData();
          }
        });
      }
    });

   }
}
