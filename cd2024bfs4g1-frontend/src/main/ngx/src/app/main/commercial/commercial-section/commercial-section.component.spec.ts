import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialSectionComponent } from './commercial-section.component';

describe('CommercialSectionComponent', () => {
  let component: CommercialSectionComponent;
  let fixture: ComponentFixture<CommercialSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
