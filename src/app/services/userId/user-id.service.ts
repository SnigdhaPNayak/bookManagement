import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  id: any;

  constructor(private http: HttpClient) { }

  data: any
  credential: any

  //Setting the user credentials
  setUserId(value: any) {

    console.log("Setting the user credentials...\n" + value)
    this.credential = value

  }

  //Fetching the user ID
  getUserId() {

    console.log("Fetching the user ID...")

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')

    const obj = JSON.parse(`{"userName":"${this.credential.userName}","password":"${this.credential.password}"}`);

    return this.http.post<any>("http://localhost:8080/login", obj, { 'headers': headers })

  }
  
}
