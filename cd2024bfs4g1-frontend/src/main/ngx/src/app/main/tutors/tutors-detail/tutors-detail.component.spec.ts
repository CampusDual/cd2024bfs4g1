import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsDetailComponent } from './tutors-detail.component';

describe('TutorsDetailComponent', () => {
  let component: TutorsDetailComponent;
  let fixture: ComponentFixture<TutorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
