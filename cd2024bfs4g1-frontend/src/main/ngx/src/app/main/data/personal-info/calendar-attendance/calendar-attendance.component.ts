import { Component, ElementRef, HostListener, Injector } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import 'moment/locale/es';
import { OntimizeService } from 'ontimize-web-ngx';

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
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  status: string;
}

interface Day {
  day: number;
  dayOfWeek: string;
}

@Component({
  selector: 'app-calendar-attendance',
  templateUrl: './calendar-attendance.component.html',
  styleUrls: ['./calendar-attendance.component.css']
})
export class CalendarAttendanceComponent {
  protected service: OntimizeService;

  statusData = [
    { id: 'S', description: 'Asistido' },
    { id: 'N', description: 'No asistido' },
    { id: 'J', description: 'Justificado' }
  ];

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

    this.service = this.injector.get(OntimizeService);}

  ngOnInit() {
   
    this.loadStudents();
    this.configureBootcamps();
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



  /*  getBootcamps() {
     if (this.service !== null) {
       const filter = {
         'startDate': this.startDate,
         'endDate': this.endDate
       };
       const types = {
         'startDate': 91,
         'endDate': 91
       };
       const columns = ['id', 'name', 'start_date', 'end_date', 'status'];
       this.service.query(filter, columns, 'bootcampDate', types).subscribe(resp => {
         if (resp.code === 0) {
           if(resp.data.length > 0){ 
             this.bootcamps = resp.data.sort((val1,val2) => val1.start_date - val2.start_date);
           }else{
             this.bootcamps = [];
           }
 
   
         } else {
           alert('Impossible to query data!');
         }
       });
     }
   } */

  loadStudents(): void {
    this.configureStudents();
    this.getStudents();
    this.students.map(student => {
    });
  }
  getStudents() {
    if (this.service !== null) {
      const columns = ['id', 'name', 'surname1', 'surname2']; // Ajusta las columnas según tu modelo

      this.service.query({}, columns, 'studentsWithBootcamp').subscribe(resp => {
        if (resp.code === 0) {
          if (resp.data.length > 0) {
            this.students = resp.data; // Guarda los estudiantes obtenidos
            console.log('Estudiantes cargados:', this.students);
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



  loadInitialDates(): void {
    const startOfWeek = moment().startOf('isoWeek').subtract(1, 'week');
    this.startDate = startOfWeek.toDate();
    this.endDate = moment(startOfWeek).add(this.weeksToShow * 7, 'days').toDate();
  }

  loadYears(): void {
    this.years = [this.selectedYear];
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  loadDays(): void {
    this.daysWithWeekDays = [];
    let current = moment(this.startDate);
    const end = moment(this.endDate);
    while (current.isBefore(end)) {
      this.daysWithWeekDays.push({
        day: current.date(),
        dayOfWeek: AbbrDayOfWeek[current.day()],
      });
      current.add(1, 'days');
    }
  }



  /*  filterBootcamps(): void {
     this.bootcamps = this.allBootcamps.filter(bootcamp => {
       return moment(bootcamp.start_date).isBetween(this.startDate, this.endDate, undefined, '[]') ||
         moment(bootcamp.end_date).isBetween(this.startDate, this.endDate, undefined, '[]') ||
         (moment(bootcamp.start_date).isBefore(this.startDate) && moment(bootcamp.end_date).isAfter(this.endDate));
     });
     console.log(`Bootcamps within the range: ${this.bootcamps.length}`);
   } */




  decSelectedWeek(): void {
    this.startDate = moment(this.startDate).subtract(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.loadStudents(); 
    this.updateCurrentMonthAndYear();
  }

  incSelectedWeek(): void {
    this.startDate = moment(this.startDate).add(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.loadStudents();
    this.updateCurrentMonthAndYear();
  }

  updateCurrentMonthAndYear(): void {
    this.selectedYear = moment(this.startDate).year();
    this.selectedMonth = moment(this.startDate).month();

    this.loadYears();
  }


  dateDifferenceInDays(date1: any, date2: any): number {
    const timeDiff = Math.abs(date2 - date1);
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }


  printDate(date: any): string { //añadio
    const tDate: Date = new Date(date);
    return tDate.getDate() + "/" + (tDate.getMonth() + 1) + "/" + tDate.getFullYear();
  }



  isSameMonthRange(): boolean {
    const startMonth = moment(this.startDate).month();
    const endMonth = moment(this.endDate).month();
    return startMonth === endMonth;
  }

  getMonthName(date: Date): string {
    const month = moment(date).format('MMMM');
    return this.capitalizeFirstLetter(month);
  }

  updateDayGridColumns() { //verificar que no devuelva valores inesperados
    return `repeat(7, 1fr)`;
  }

  updateBootcampsGridColumnsContainer() {
    return `repeat(7, 1fr)`;
  }


  updateDayCSSForCurrentDay(day: number) {
    if (moment().isSame(moment(this.startDate).date(day), 'day')) {
      return '#8AB237';
    }
    return '#1a3459';
  }

  updateDayCSSFontColorForCurrentDay(day: number) {
    if (moment().isSame(moment(this.startDate).date(day), 'day')) {
      return 'black';
    }
    return 'white';
  }

  updateDayCSSFontWeightForCurrentDay(day: number) {
    if (moment().isSame(moment(this.startDate).date(day), 'day')) {
      return 'bold';
    }
    return 'normal';
  }

  isWeekend(dayOfWeek: string): boolean {
    return dayOfWeek === 'Sab' || dayOfWeek === 'Dom';
  }




}

