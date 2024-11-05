import { Component, Input } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';


@Component({
  selector: 'app-schedule-row',
  templateUrl: './schedule-row.component.html',
  styleUrls: ['./schedule-row.component.css']
})
export class ScheduleRowComponent {

  @Input() days:number;
  elements:Date[];
  today:Date = new Date();

  constructor(){
    registerLocaleData(es);
    this.fillSchedule();
  }

  addDate(date:Date,amount:number):Date{
    let result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
  }

  move(sign: number) {
    this.today=this.addDate(this.today,(sign*this.days));
    this.fillSchedule();
  }

  fillSchedule(){
    this.elements=[];
    let date=this.addDate(this.today,-this.days);
    while(date<this.addDate(this.today,this.days)){
      console.log(date);
      this.elements.push(date);
      date=this.addDate(date,1);
    }
  }
}
