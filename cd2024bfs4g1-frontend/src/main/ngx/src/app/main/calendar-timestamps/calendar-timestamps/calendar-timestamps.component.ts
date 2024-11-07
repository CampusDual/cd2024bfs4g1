import { Component, ElementRef, HostListener } from '@angular/core';
import moment from 'moment';
import { CalendarService } from '../calendar-service.service';

enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11, 
}

enum AbbrMonth {
  Jan = 0,
  Feb = 1,
  Mar = 2,
  Apr = 3,
  May = 4,
  Jun = 5,
  Jul = 6,
  Aug = 7,
  Sep = 8,
  Oct = 9,
  Nov = 10,
  Dec = 11,
}

enum AbbrDayOfWeek {
  Sun = 0,
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
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
  years: number[] = [];
  months: string[] = [];
  days: number[] = [];
  weekDays: string[] = [];
  daysWithWeekDays: Day[] = [];
  allBootcamps: Bootcamp[] = [];
  bootcamps: Bootcamp[] = [];
  backendResponse: any;

  private currentDate = Date.now();
  private currentYear = moment(this.currentDate).year();
  private currentMonth = moment(this.currentDate).month();
  private currentDay = moment(this.currentDate).date();

  public selectedYear = this.currentYear;
  public selectedMonth = this.currentMonth;

  constructor(private elementRef: ElementRef, private calendarService: CalendarService) {
  }

  // Load data ------------------------------------------------------------------------------
  ngOnInit(): void {
    this.loadYears();
    this.loadMonths();
    this.loadDays();
    this.calendarService.searchBootcamps().subscribe(
      response => {
        console.log('POST Response:', response);
        response.data.map((bootcamp: any) => {
          bootcamp.start_date = new Date(bootcamp.start_date);
          bootcamp.end_date = new Date(bootcamp.end_date);
        });
        this.allBootcamps = response.data;
        console.log('All Bootcamps:', this.allBootcamps);
      },
      error => {
        console.error('POST Error:', error);
      }
    );
    this.loadAllBootcamps();
    this.loadBootcamps();

  }

  queryBackend(): void {
    }

  loadYears(): void {
    this.years=[this.selectedYear]
  }

  loadMonths(): void {
    this.months = [Month[this.selectedMonth]];
  }

  loadDays(): void {
    this.days = Array.from({ length: this.getDaysInMonth(this.selectedYear, this.selectedMonth + 1)}, (_, i) => i + 1); 
    this.daysWithWeekDays = this.days.map(day => {
      return {day: day, dayOfWeek: AbbrDayOfWeek[new Date(this.selectedYear, this.selectedMonth, day).getDay()]};
    });
  }

  loadAllBootcamps(): void {

  console.log(`All Bootcamps: ${this.allBootcamps}`);
}

  loadBootcamps(): void { //Conditionally loads the bootcamp data based on the selected month and year
    this.bootcamps = this.allBootcamps.filter(bootcamp => {
      if (bootcamp.start_date.getUTCMonth() <= this.selectedMonth && bootcamp.start_date.getUTCFullYear() <= this.selectedYear //If the bootcamp starts in the selected month or year or before
      && bootcamp.end_date.getUTCMonth() >= this.selectedMonth && bootcamp.end_date.getUTCFullYear() >= this.selectedYear){ //If the bootcamp ends in the selected month or year or after
        return true;
      }
      return false;});
    this.bootcamps.map(bootcamp => {
      this.updateBootcampsGridColumns(bootcamp.id, bootcamp.start_date, bootcamp.end_date);
    })
  }

  //State related --------------------------------------------------------------------------
  decSelectedYear(): void {
    this.selectedYear--;
    this.loadYears();
    this.loadDays();
    this.loadBootcamps();
  }

  incSelectedYear(): void {
    this.selectedYear++;
    this.loadYears();
    this.loadDays();
    this.loadBootcamps();
  }

  decSelectedMonth(): void {
    this.selectedMonth--;
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
      this.loadYears();
    }
    this.loadMonths();
    this.loadDays();
    this.loadBootcamps();
  }

  incSelectedMonth(): void {
    this.selectedMonth++;
    if(this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
      this.loadYears();
    }
    this.loadMonths();
    this.loadDays();
    this.loadBootcamps();
  }

  //Event related --------------------------------------------------------------------------
  @HostListener('window:scroll', [])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      this.loadYears();
      this.loadMonths();
      this.loadDays();
      this.loadAllBootcamps();
      this.loadBootcamps();
    }
  }


  //Auxiliary functions --------------------------------------------------------------------
  getDaysInMonth(year: number, month: number): number {
    this.getWeekDaysInMonth(year, month);
    return new Date(year, month, 0).getDate();
  }
  getWeekDaysInMonth(year: number, month: number): void {
    const numberOfDays = new Date(year, month, 0).getDate();
    this.weekDays = [];
    for (let i = 1; i <= numberOfDays; i++) {
      this.weekDays.push(AbbrDayOfWeek[new Date(year, month - 1, i).getDay()]);
    }
  }


  //CSS ------------------------------------------------------------------------------------
  updateDayGridColumns() {
    return `repeat(${this.days.length}, 1fr)`;
  }

  updateBootcampsGridColumnsContainer() {
    return `repeat(${this.days.length}, 1fr)`;
  }

  updateBootcampsGridColumns(bootcampId: number, startDate: Date, endDate: Date) {
    let startColumn = 1;
    let endColumn = this.days.length + 1;
    if (startDate.getUTCMonth() == this.selectedMonth) {
      startColumn = startDate.getUTCDate();
    }
    if (endDate.getUTCMonth() == this.selectedMonth) {
      endColumn = endDate.getUTCDate() + 1; 
    }
    return `${bootcampId} / ${startColumn} / auto / ${endColumn}`; //changes the CSS grid-area to 'grid-area':grid-row-start/grid-column-start/grid-row-end/grid-column-end
  }

  updateDayCSSForCurrentDay(day: number) {
    if (this.currentDay == day && this.currentMonth == this.selectedMonth && this.currentYear == this.selectedYear) {
      return 'bold';
    }
    return 'normal';
  }

}