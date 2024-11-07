import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tutors-detail',
  templateUrl: './tutors-detail.component.html',
  styleUrls: ['./tutors-detail.component.css']
})
export class TutorsDetailComponent implements OnInit {
  tutorsForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.tutorsForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      surname1: new FormControl(),
      surname2: new FormControl(),
      email: new FormControl(),
    });
  }
  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}
