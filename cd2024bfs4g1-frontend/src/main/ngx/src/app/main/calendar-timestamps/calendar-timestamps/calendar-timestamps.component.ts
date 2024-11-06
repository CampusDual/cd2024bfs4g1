import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calendar-timestamps',
  templateUrl: './calendar-timestamps.component.html',
  styleUrls: ['./calendar-timestamps.component.css'],
})
export class CalendarTimestampsComponent {
  years: number[] = [];
  months: string[] = [];
  days: number[] = [];

  private yearCount = 2021;

  constructor() {}

  ngOnInit(): void {
    this.loadYears();
    this.loadMonths();
    this.loadDays();
  }

  loadYears(): void {
    this.years=[2024]
  }

  loadMonths(): void {
    this.months = ["January"];
  }

  loadDays(): void {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1); // Days 1 through 20
  }

  @HostListener('window:scroll', [])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      this.loadYears();
      this.loadMonths();
      this.loadDays();
    }
  }
}