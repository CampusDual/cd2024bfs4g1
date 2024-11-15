import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorBootcampAddComponent } from './tutor-bootcamp-add.component';

describe('TutorBootcampAddComponent', () => {
  let component: TutorBootcampAddComponent;
  let fixture: ComponentFixture<TutorBootcampAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorBootcampAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorBootcampAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
