import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) { }

  login(
    username: string,
    password: string
  ) {
    const md5 = new Md5();

    var jsonObject = {
      username: username,
      password: password
      //md5.appendStr(password).end().toString()
    };

    return this.http.post('/user/log-in', jsonObject);
  }
}
