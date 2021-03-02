import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';
import { LogUser } from '../interfaces/logUser';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    var logUser: LogUser = {
      username: username,
      password: password
      //md5.appendStr(password).end().toString()
    };

    return this.http.post('/user/log-in', logUser, {responseType: 'text'});
  }
}
