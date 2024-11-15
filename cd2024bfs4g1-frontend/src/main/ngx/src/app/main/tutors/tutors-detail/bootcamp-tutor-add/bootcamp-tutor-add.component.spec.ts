import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampTutorAddComponent } from './bootcamp-tutor-add.component';

describe('BootcampTutorAddComponent', () => {
  let component: BootcampTutorAddComponent;
  let fixture: ComponentFixture<BootcampTutorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampTutorAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampTutorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
