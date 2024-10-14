import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampsDetailsComponent } from './bootcamps-details.component';

describe('BootcampsDetailsComponent', () => {
  let component: BootcampsDetailsComponent;
  let fixture: ComponentFixture<BootcampsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
