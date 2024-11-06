import { TestBed } from '@angular/core/testing';

import { CalendarServiceService } from './calendar-service.service';

describe('CalendarServiceService', () => {
  let service: CalendarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
