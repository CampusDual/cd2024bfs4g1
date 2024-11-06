import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarServiceService {
 // Generate years, months, and days for display
 generateYears(startYear: number, endYear: number): string[] {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }
  return years;
}

generateMonths(): string[] {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

generateDays(month: string): string[] {
  const days = [];
  const daysInMonth = month === 'Feb' ? 28 : [4, 6, 9, 11].includes(new Date(`${month} 1, 2020`).getMonth() + 1) ? 30 : 31;
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day.toString());
  }
  return days;
}

// Example events that span multiple days
getEvents() {
  return [
    { id: 1, start: '2023-03-01', end: '2023-03-05', title: 'Event 1' },
    { id: 2, start: '2023-04-10', end: '2023-04-12', title: 'Event 2' },
    { id: 3, start: '2023-05-15', end: '2023-05-20', title: 'Event 3' }
  ];
}
}
