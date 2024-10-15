import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampsNewComponent } from './bootcamps-new.component';

describe('BootcampsNewComponent', () => {
  let component: BootcampsNewComponent;
  let fixture: ComponentFixture<BootcampsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
