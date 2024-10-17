import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBootcampAddComponent } from './student-bootcamp-add.component';

describe('StudentBootcampAddComponent', () => {
  let component: StudentBootcampAddComponent;
  let fixture: ComponentFixture<StudentBootcampAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBootcampAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBootcampAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
