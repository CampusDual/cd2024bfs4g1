import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BootcampNewComponent } from './bootcamp-new.component';

describe('BootcampsNewComponent', () => {
  let component: BootcampNewComponent;
  let fixture: ComponentFixture<BootcampNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
