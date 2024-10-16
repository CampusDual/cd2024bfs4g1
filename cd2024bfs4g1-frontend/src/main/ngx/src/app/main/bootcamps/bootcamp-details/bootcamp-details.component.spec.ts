import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampDetailsComponent } from './bootcamp-details.component';

describe('BootcampsDetailsComponent', () => {
  let component: BootcampDetailsComponent;
  let fixture: ComponentFixture<BootcampDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
