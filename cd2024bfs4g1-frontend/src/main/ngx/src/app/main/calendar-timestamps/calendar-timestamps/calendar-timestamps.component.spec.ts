import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTimestampsComponent } from './calendar-timestamps.component';

describe('CalendarTimestampsComponent', () => {
  let component: CalendarTimestampsComponent;
  let fixture: ComponentFixture<CalendarTimestampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTimestampsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarTimestampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
