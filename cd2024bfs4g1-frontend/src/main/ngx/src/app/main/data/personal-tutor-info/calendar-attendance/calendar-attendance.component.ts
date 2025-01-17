import { Component, ElementRef, HostListener, Injector, Input, ViewChild } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import 'moment/locale/es';
import { OntimizeService, OTextInputComponent } from 'ontimize-web-ngx';
import { OSnackBarConfig, SnackBarService } from 'ontimize-web-ngx';
import { MatDialog } from '@angular/material/dialog';

enum AbbrDayOfWeek {
  Dom = 0,
  Lun = 1,
  Mar = 2,
  Mie = 3,
  Jue = 4,
  Vie = 5,
  Sab = 6,
}

interface Student {
  student_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  status: string;

}

interface AttendanceStatus {
  id: number,
  abreviatura: string,
  descripcion: string
}

interface Day {
  day: number;
  dayOfWeek: string;
  fullDate: Date;
}

@Component({
  selector: 'app-calendar-attendance',
  templateUrl: './calendar-attendance.component.html',
  styleUrls: ['./calendar-attendance.component.css']
})
export class CalendarAttendanceComponent {
  @ViewChild('attendanceDialog') attendanceDialog: any;
  selectedDate: Date = new Date();
  selectedStatus: number = 1;
  selectedStartDate: Date;
  selectedEndDate: Date;

  protected service: OntimizeService;
  protected serviceName: string;
  protected serviceBkName: string;


  @Input('bootcampId')
  bootcampId: number;

  weeksToShow = 1;
  startDate: Date;
  endDate: Date;
  years: number[] = [];
  months: string[] = [];
  days: number[] = [];
  weekDays: string[] = [];
  daysWithWeekDays: Day[] = [];
  allStudents: Student[] = [];
  students: any[] = [];
  statusData: any[] = [];
  attendanceModified: any[] = [];
  attendance: any[] = [];
  attendanceMap: { [key: string]: number } = {};
  studentMap = new Map<number, Map<string, number>>();


  backendResponse: any;
  startBootcampDate: Date;
  endBootcampsDate: Date;

  private currentDate = Date.now();
  private currentYear = moment(this.currentDate).year();
  private currentMonth = moment(this.currentDate).month();

  public selectedYear = this.currentYear;
  public selectedMonth = this.currentMonth;

  constructor(
    protected snackBarService: SnackBarService,
    protected injector: Injector,
    private elementRef: ElementRef,
    private router: Router,
    private dialog: MatDialog
  ) {
    moment.locale('es');
    this.loadInitialDates();
    this.loadDays();
    this.loadYears();

    this.service = this.injector.get(OntimizeService);


  }
  refresh() {
    this.getStudents();
    //this.loadAttendance();
    this.getAttendance();
    this.getBootcampDates();
  }
  ngOnInit() {
    this.getAttendanceStatus();
    this.configureBootcamps();
  }
  ngOnChanges() {
    this.getStudents();
   // this.loadAttendance();
   this.getAttendance();
    this.getBootcampDates();

  }

  protected configureBootcamps() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('bootcamps');
    this.service.configureService(conf);
  }
  protected configureStudents() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('studentBootcamps');
    this.service.configureService(conf);
  }
  protected configureAttendanceStatus() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('attendance_status');
    this.service.configureService(conf);
  }
  protected configureAttendance() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('attendance');
    this.service.configureService(conf);
  }


  getStudents() {

    if (this.service && this.bootcampId) {
      const columns = ['student_id', 'name', 'surname1', 'surname2', 'computable'];
      const filter = { 'bootcamp_id': this.bootcampId };
      this.configureStudents();
      this.service.query(filter, columns, 'studentsWithComputable').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            console.log('Respuesta con computable:', resp.data);

            this.students = resp.data.map((stu: any) => {
              return {
                ...stu,
                isComputable: stu.computable
              };
            });
          } else {
            this.students = [];
          }
        } else {
          this.snackBarService.open('Error al cargar los datos de los estudiantes.');
        }
      });
      this.configureBootcamps();
    }
  }




  getAttendanceStatus() {
    if (this.service !== null) {
      const columns = ['id', 'abbreviation', 'description', 'color'];


      this.configureAttendanceStatus();
      this.service.query({}, columns, 'attendanceControl').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.statusData = resp.data.sort((a, b) => a.id - b.id); // Asignar correctamente los datos a statusData
          } else {
            this.statusData = [];
          }
        } else {
          this.snackBarService.open('Error al cargar los datos de los estatus de asistencia.');
        }
      });
      this.configureBootcamps();
    }
  }


  getAttendance() {

    if (this.service && this.bootcampId) {
      const columns = ['id', 'student_id', 'bootcamp_id', 'date', 'attendance_status_id'];

      const filter = {
        'bootcamp_id': this.bootcampId
      }

      this.configureAttendance();
      this.service.query(filter, columns, 'attendance').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.attendance = resp.data; // Asignar correctamente los datos a statusData
            this.attendance.map(status => {
              if (this.studentMap.get(status.student_id)) {
                let dayMap = this.studentMap.get(status.student_id);
                dayMap.set(this.printDate(status.date), status.attendance_status_id);
                this.studentMap.set(status.student_id, dayMap);
              } else {
                let dayMap = new Map<string, number>();
                dayMap.set(this.printDate(status.date), status.attendance_status_id);
                this.studentMap.set(status.student_id, dayMap);
              }
            });
          } else {
            this.attendance = [];
          }
        } else {
          this.snackBarService.open('Error al cargar los datos de asistencia.');
        }
      });
      this.configureBootcamps();
    }
  }

  //Obtener primer y último dia de la semana actual
  loadInitialDates(): void {
    const startOfWeek = moment().startOf('isoWeek');
    this.startDate = startOfWeek.toDate();
    this.endDate = moment(startOfWeek).add(this.weeksToShow * 7, 'days').toDate();
  }

  //Obtener año actual
  loadYears(): void {
    this.years = [this.selectedYear];
  }

  //Mayuscula
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  //Almacena objetos Day en un array
  loadDays(): void {
    this.daysWithWeekDays = [];
    let current = moment(this.startDate);
    const end = moment(this.endDate);
    while (current.isBefore(end)) {
      this.daysWithWeekDays.push({
        day: current.date(),
        dayOfWeek: AbbrDayOfWeek[current.day()],
        fullDate: current.clone().toDate()
      });
      current.add(1, 'days');
    }
  }

  //ir a semana anterior

  //llama
  decSelectedWeek(): void {
    this.attendanceModified = [];
    this.startDate = moment(this.startDate).subtract(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.getStudents();
    this.updateCurrentMonthAndYear();
  }

  //ir a semana posterior

  //llama
  incSelectedWeek(): void {
    this.attendanceModified = [];
    this.startDate = moment(this.startDate).add(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.getStudents();
    this.updateCurrentMonthAndYear();
  }

  //Actualizar mes y año
  updateCurrentMonthAndYear(): void {
    this.selectedYear = moment(this.startDate).year();
    this.selectedMonth = moment(this.startDate).month();
    this.loadYears();
  }

  //Fecha a string dd/mm/aaaa
  printDate(date: any): string {
    const tDate: Date = new Date(date);
    return tDate.getDate() + "/" + (tDate.getMonth() + 1) + "/" + tDate.getFullYear();
  }

  //Comporbar si pertenecen al mismo mes
  isSameMonthRange(): boolean {
    const startMonth = moment(this.startDate).month();
    const endMonth = moment(this.endDate).month();
    return startMonth === endMonth;
  }

  getMonthName(date: Date): string {
    const month = moment(date).format('MMMM');
    return this.capitalizeFirstLetter(month);
  }

  //Tamaño columnas grid
  updateDayGridColumns() {
    return `7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;
  }

  //Cambiar color al dia actual (background)
  updateDayCSSForCurrentDay(day: number) {
    if (moment().isSame(moment(this.startDate).date(day), 'day')) {
      return '#8AB237';
    }
    return '#1a3459';
  }

  //Cambiar color al dia actual (color)
  updateDayCSSFontColorForCurrentDay(day: number) {
    if (moment().isSame(moment(this.startDate).date(day), 'day')) {
      return 'black';
    }
    return 'white';
  }

  updateCSSfaultInfo

  //Cambiar color al dia actual (font)
  updateDayCSSFontWeightForCurrentDay(day: number) {
    if (moment().isSame(moment(this.startDate).date(day), 'day')) {
      return 'bold';
    }
    return 'normal';
  }

  //Comprobar si es sabado o Domingo
  isWeekend(dayOfWeek: string): boolean {
    return dayOfWeek === 'Sab' || dayOfWeek === 'Dom';
  }

  onSelectChange(event: any, student: Student, day: Day): void {
    const selectedStatus = event.value;
    console.log(event);
    console.log(student);
    console.log(day);
    let newElement = {
      student_id: student.student_id,
      bootcamp_id: this.bootcampId,
      status: selectedStatus,
      date: this.printDate(day.fullDate)
    };

    this.attendanceModified[student.student_id + ":" + this.printDate(day.fullDate)] = newElement;

    this.studentMap.get(student.student_id).set(this.printDate(day.fullDate), selectedStatus);
  }

  getSelectedTooltip(student: any, dayWithWeekDay: any): string | null {
    const attendanceStatusId = this.getAttendanceOfDay(student.student_id, dayWithWeekDay.fullDate);
    const selectedStatus = this.statusData.find(status => status.id === attendanceStatusId);
    return selectedStatus ? selectedStatus.description : null; // Retorna null si no hay selección.
  }

  saveAttendaces() { 

    const attendanceArray = Object.values(this.attendanceModified);
    if(attendanceArray.length > 0){
      this.configureAttendance();
      this.service.insert({ data: attendanceArray }, 'attendance').subscribe(
        response => {
          this.attendanceModified = [];
          this.snackBarService.open('asistenciasSave');
          //this.loadAttendance();
          this.getAttendance();
        },
        error => {
          console.error('Error al procesar asistencias:', error);
          this.snackBarService.open('Error al guardar asistencias.');
        }
      );
      this.configureBootcamps();
    }    
  }

  getBackgroundColor(abbreviation: string): string {
    const status = this.statusData.find(s => s.abbreviation === abbreviation);
    return status ? status.color : '#F5F0F2';

  }
  getAttendanceOfDay(student: number, day: Date): number {

    if (this.studentMap.get(student)) {
      return this.studentMap.get(student).get(this.printDate(day));
    } else {
      return null;
    }

  }

  getAbbreviationByStatusId(statusId: number): string {
    const status = this.statusData.find(s => s.id === statusId);
    return status ? status.abbreviation : 'N/A'; // Devuelve 'N/A' si no se encuentra
  }

  getBootcampDates(): void {

    if (this.service && this.bootcampId) {
      const columns = ['start_date', 'end_date'];

      const filter = {
        'id': this.bootcampId
      }

      this.configureBootcamps();
      this.service.query(filter, columns, 'bootcamp').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {

            this.startBootcampDate = resp.data[0].start_date;
            this.endBootcampsDate = resp.data[0].end_date;


          } else {
            this.snackBarService.open('La longitud de la respuesta es 0.');

          }
        } else {
          this.snackBarService.open('Error al cargar las fechas.');
        }
      });
    }
  }

  isBootcampInRange(date: Date): boolean {
    return date >= this.startBootcampDate && date <= this.endBootcampsDate;
  }

  goToToday(): void {
    this.attendanceModified = [];
    const startOfWeek = moment().startOf('isoWeek');
    this.startDate = startOfWeek.toDate();
    this.endDate = moment(startOfWeek).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.getStudents();
    this.updateCurrentMonthAndYear();
  }

  openAttendanceDialog() {
    this.dialog.open(this.attendanceDialog);
    this.configureBootcamps();
  }

  iterateDateRange() {
    if (!this.selectedStartDate || !this.selectedEndDate) {
      console.error('Por favor selecciona ambas fechas.');
      return;
    }

    const dates = [];
    let currentDate = new Date(this.selectedStartDate);
    while (currentDate <= this.selectedEndDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }


  onDatePickerClosed(): void {
    this.configureBootcamps();
  }


  submitAttendance() {
    const dateRange = this.iterateDateRange();
    console.log('Date Range:', dateRange);

    this.attendanceModified = [];

    for (const day of dateRange) {
      for (const student of this.students) {
        let newElement = {
          student_id: student.student_id,
          bootcamp_id: this.bootcampId,
          status: this.selectedStatus,
          date: this.printDate(day)
        };
        this.attendanceModified[student.student_id + ":" + this.printDate(day)] = newElement;
      }
    }

    this.saveAttendaces();
    this.loadDays();
    this.updateCurrentMonthAndYear();
    this.dialog.closeAll();
  }




}
