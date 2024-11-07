// src/app/services/bootcamp-search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:8080/bootcamps/bootcamp/search';

  constructor(private http: HttpClient) {}

  searchBootcamps(): Observable<any> {
    const requestBody = {
      columns: ['id', 'name', 'start_date', 'end_date', 'status'],
      filter: {},
      sqltypes: {
        start_date: 93,
        end_date: 93
      }
    };

    const headers = new HttpHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:124.0) Gecko/20100101 Firefox/124.0',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGlvbi10aW1lIjoxNzI4NjQzMTk1MDU1LCJ1c2VybmFtZSI6ImRlbW8ifQ.0zjaGgrFt2LQG76gYBadZj8_SbJed0DePS2rvBgtUxU',
      'Origin': 'http://localhost:4299',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Referer': 'http://localhost:4299/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site'
    });

    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }
}