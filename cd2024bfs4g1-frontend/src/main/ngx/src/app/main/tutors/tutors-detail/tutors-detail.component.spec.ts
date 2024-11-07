import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorsDetailComponent } from './tutors-detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';

describe('TutorsDetailComponent', () => {
  let component: TutorsDetailComponent;
  let fixture: ComponentFixture<TutorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorsDetailComponent],
      imports: [
        ReactiveFormsModule,
        OntimizeWebModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
