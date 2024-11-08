import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  student: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudentData();
  }

  loadStudentData(){
    this.http.get('/students/current', { headers: {'user_login': 'user_login_value'}}).subscribe(data => {
      this.student = data;
    }, error => {
      console.error('Error leading student data: ', error)
    })
  }

}