import { Component, ElementRef, HostListener, Injector, Input, ViewChild } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import 'moment/locale/es';
import { OntimizeService, OTextInputComponent } from 'ontimize-web-ngx';

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
  protected service: OntimizeService;

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
  backendResponse: any;

  private currentDate = Date.now();
  private currentYear = moment(this.currentDate).year();
  private currentMonth = moment(this.currentDate).month();

  public selectedYear = this.currentYear;
  public selectedMonth = this.currentMonth;

  constructor(
    protected injector: Injector,
    private elementRef: ElementRef,
    private router: Router
  ) {
    moment.locale('es');
    this.loadInitialDates();
    this.loadDays();
    this.loadYears();

    this.service = this.injector.get(OntimizeService);
  }

  ngOnInit() {
    this.loadAttendanceStatus();
    this.loadAttendance();
    this.configureBootcamps();
  }
  ngOnChanges() {
    this.loadStudents();
    console.log(this.bootcampId);
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

  loadStudents(): void {
    this.configureStudents();
    this.getStudents();
    this.students.map(student => {
    });
  }
  getStudents() {
    if (this.service !== null) {
      const columns = ['student_id', 'name', 'surname1', 'surname2'];

      const filter = {
        'bootcamp_id': this.bootcampId
      }
      this.service.query(filter, columns, 'studentsWithBootcamp').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.students = resp.data;
            console.log('Estudiantes cargados:', this.students);
            console.log(this.bootcampId);
          } else {
            this.students = [];
            console.log('No hay estudiantes disponibles.');
          }
        } else {
          alert('Error al cargar los datos de los estudiantes.');
        }
      });
    }
  }

  loadAttendanceStatus(): void {
    this.configureAttendanceStatus();
    this.getAttendanceStatus();
    this.statusData.map(status => {
    });
  }
  getAttendanceStatus() {
    if (this.service !== null) {
      const columns = ['id', 'abbreviation', 'description'];

      this.service.query({}, columns, 'attendanceControl').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.statusData = resp.data; // Asignar correctamente los datos a statusData
            console.log('Estatus de asistencia cargados:', this.statusData);
          } else {
            this.statusData = [];
            console.log('No hay estatus de asistencia disponibles.');
          }
        } else {
          alert('Error al cargar los datos de los estatus de asistencia.');
        }
      });
    }
  }

  loadAttendance(): void {
    this.configureAttendance();
    this.getAttendance();
    this.attendance.map(attendance => {
    });
  }
  getAttendance() {
    if (this.service !== null) {
      const columns = ['id', 'student_id', 'bootcamp_id', 'date', 'attendance_status_id'];

      const filter = {
        'bootcamp_id': this.bootcampId
      }

      this.service.query(filter, columns, 'attendance').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.attendance = resp.data; // Asignar correctamente los datos a statusData
            console.log('Datos de asistencia cargados:', this.attendance);
          } else {
            this.attendance = [];
            console.log('No hay datos de asistencia disponibles.');
          }
        } else {
          alert('Error al cargar los datos de asistencia.');
        }
      });
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
  decSelectedWeek(): void {
    this.startDate = moment(this.startDate).subtract(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.loadStudents();
    this.updateCurrentMonthAndYear();
  }

  //ir a semana posterior
  incSelectedWeek(): void {
    this.startDate = moment(this.startDate).add(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.loadStudents();
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
    return `3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;
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
    const selectedStatus = parseInt(event.target.value, 10);
    console.log('Estudiante:', student);
    console.log('Estado seleccionado:', selectedStatus);
    console.log('Fecha:', day.fullDate);
    console.log('ID del Bootcamp:', this.bootcampId);

    let newElement = {
      student_id: student.student_id,
      bootcamp_id: this.bootcampId,
      status: selectedStatus,
      date: this.printDate(day.fullDate)
    };

    this.attendanceModified[student.student_id + ":" + this.printDate(day.fullDate)] = newElement;
    console.log(this.attendanceModified);
  }

  getSelectedTooltip(student: any, dayWithWeekDay: any): string | null {
    const key = `${student.student_id}:${dayWithWeekDay.fullDate}`;
    const selectedStatus = this.statusData.find(status => status.id === this.attendanceMap[key]);
    return selectedStatus ? selectedStatus.description : null; // Retorna null si no hay selección.
  }
  

  onButtonClick() {
    this.configureAttendance();
    const attendanceArray = Object.values(this.attendanceModified);
    this.service.insert({ data: attendanceArray }, 'attendance').subscribe(
      response => {
        console.log('Asistencias procesadas:', response);
        this.attendanceModified = [];
        alert('Asistencias guardadas correctamente.');
      },
      error => {
        console.error('Error al procesar asistencias:', error);
        alert('Error al guardar asistencias.');
      }
    );

  }

}
