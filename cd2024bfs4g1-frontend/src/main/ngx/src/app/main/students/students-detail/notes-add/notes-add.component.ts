import { Component, ViewChild } from '@angular/core';
import { ODateInputComponent, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent {
  todayDate: string = '';
  todayTimestamp: number = 0;
  @ViewChild('notesForm') notesForm: OFormComponent;
  @ViewChild('date') date: ODateInputComponent;

  ngOnInit() {

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.todayDate = `${day}/${month}/${year}`;


    const [dd, mm, yyyy] = this.todayDate.split('/').map(Number);
    const parsedDate = new Date(yyyy, mm - 1, dd);
    this.todayTimestamp = parsedDate.getTime();

  }

  ngAfterViewInit() {
    if (this.date) {
      this.date.setValue(this.todayTimestamp);
      console.log("TiSt"+this.todayTimestamp);
      console.log("Date: "+ this.date.getValue().toString());
    }
  }
  addNotes() {
    this.notesForm.insert();
  }
}
