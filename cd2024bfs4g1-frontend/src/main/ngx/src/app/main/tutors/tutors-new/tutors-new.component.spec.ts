import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsNewComponent } from './tutors-new.component';

describe('TutorsNewComponent', () => {
  let component: TutorsNewComponent;
  let fixture: ComponentFixture<TutorsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
