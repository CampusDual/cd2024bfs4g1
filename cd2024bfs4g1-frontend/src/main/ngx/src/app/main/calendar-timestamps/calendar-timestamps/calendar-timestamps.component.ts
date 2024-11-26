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

interface Bootcamp {
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
  selector: 'app-calendar-timestamps',
  templateUrl: './calendar-timestamps.component.html',
  styleUrls: ['./calendar-timestamps.component.css'],
})
export class CalendarTimestampsComponent {

  protected service: OntimizeService;
  weeksToShow = 3;
  startDate: Date;
  endDate: Date;
  years: number[] = [];
  months: string[] = [];
  days: number[] = [];
  weekDays: string[] = [];
  daysWithWeekDays: Day[] = [];
  allBootcamps: Bootcamp[] = [];
  bootcamps: any[] = [];
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
    this.configureService();
  }

  ngOnInit(){
    this.loadBootcamps();
  }

  protected configureService() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('bootcamps');
    this.service.configureService(conf);
  }

  getBootcamps() {
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
          if(resp.data.length > 0){ //este if-else añadido

            this.bootcamps = resp.data.sort((val1,val2) => val1.start_date - val2.start_date);
          }else{
            this.bootcamps = [];
          }

  
        } else {
          alert('Impossible to query data!');
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
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      this.daysWithWeekDays.push({
        day: current.date(),
        dayOfWeek: AbbrDayOfWeek[current.day()],
      });
      current.add(1, 'days');
    }
  }

  loadBootcamps(): void {
    this.getBootcamps();
    console.log(`Is bootcamps empty: ${this.bootcamps.length == 0}`);
    this.bootcamps.map(bootcamp => {
      this.updateBootcampsGridColumns(bootcamp);
    });
  }

  filterBootcamps(): void {
    this.bootcamps = this.allBootcamps.filter(bootcamp => {
      return moment(bootcamp.start_date).isBetween(this.startDate, this.endDate, undefined, '[]') ||
             moment(bootcamp.end_date).isBetween(this.startDate, this.endDate, undefined, '[]') ||
             (moment(bootcamp.start_date).isBefore(this.startDate) && moment(bootcamp.end_date).isAfter(this.endDate));
    });
    console.log(`Bootcamps within the range: ${this.bootcamps.length}`);
  }
  

  navigateToBootcampDetail(bootcampId: number): void {
    this.router.navigate(['/main/bootcamps', bootcampId]);
  }

  decSelectedWeek(): void {
    this.startDate = moment(this.startDate).subtract(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.loadBootcamps(); //añadio
    this.updateCurrentMonthAndYear(); 
  }
  
  incSelectedWeek(): void {
    this.startDate = moment(this.startDate).add(1, 'weeks').toDate();
    this.endDate = moment(this.startDate).add(this.weeksToShow * 7, 'days').toDate();
    this.loadDays();
    this.loadBootcamps(); //añadio
    this.updateCurrentMonthAndYear();
  }

  updateCurrentMonthAndYear(): void {
    this.selectedYear = moment(this.startDate).year();
    this.selectedMonth = moment(this.startDate).month();

    this.loadYears();
  }

  getDisplayName(bootcamp: any): string {
    const diffStart = this.dateDifferenceInDays(this.startDate, bootcamp.end_date);
    const diffEnd = this.dateDifferenceInDays(bootcamp.start_date, this.endDate);

    if (diffStart < 4 || diffEnd < 4) {
      return '.  .  .'; 
    }
    return bootcamp.name; 
  }

  dateDifferenceInDays(date1: any, date2: any): number {
    const timeDiff = Math.abs(date2 - date1);
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }


  printDate(date: any): string{ //añadio
    const tDate: Date = new Date(date);
    return tDate.getDate()+"/"+(tDate.getMonth()+1)+"/"+tDate.getFullYear();
  } 

  shouldHideDates(bootcamp: Bootcamp): boolean {
    const diffStart = this.dateDifferenceInDays(this.startDate, bootcamp.end_date);
    const diffEnd = this.dateDifferenceInDays(bootcamp.start_date, this.endDate);
  
    return diffStart < 4 || diffEnd < 4;
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


  @HostListener('window:scroll', [])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      this.loadDays();
      this.filterBootcamps();
    }
  }

  updateDayGridColumns() { //verificar que no devuelva valores inesperados
    return `repeat(${this.daysWithWeekDays.length}, 1fr)`;
  }

  updateBootcampsGridColumnsContainer() {
    return `repeat(${this.daysWithWeekDays.length}, 1fr)`;
  }

  updateBootcampsGridColumns(bootcamp: Bootcamp): { [key: string]: string } {
    const startDateMoment = moment(bootcamp.start_date);
    const endDateMoment = moment(bootcamp.end_date);
    let startColumn = startDateMoment.diff(moment(this.startDate), 'days') + 1;
    let endColumn = endDateMoment.diff(moment(this.startDate), 'days') + 2;

    if (startColumn < 1) {
      startColumn = 1;
    }
    if (endColumn > this.daysWithWeekDays.length + 1) {
      endColumn = this.daysWithWeekDays.length + 1;
    }

    return {
      '--start-day': startColumn.toString(),
      '--end-day': endColumn.toString()
    };
  }

  updateBootcampsFontSize(bootcampId: number, startDate: Date, endDate: Date) {
    let durationDays = moment(endDate).diff(moment(startDate), 'days');
    if (durationDays < 6) {
      return 'small';
    } else if (durationDays < 12) {
      return 'medium';
    } else {
      return 'large';
    }
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

  getTooltip(bootcamp: any): string {
    const startMonthYear = bootcamp.start_date.toLocaleString('default', { month: 'long', year: 'numeric' });
    const endMonthYear = bootcamp.end_date.toLocaleString('default', { month: 'long', year: 'numeric' });
    return startMonthYear;
  }


}

