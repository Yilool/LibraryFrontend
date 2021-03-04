import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LogUser } from '../interfaces/logUser';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public logStatusUser = new Subject<boolean>();
  public logStatus$ = this.logStatusUser.asObservable();
  public url = '';

  constructor(private http: HttpClient, router: Router) {}

  login(username: string, password: string): Observable<any> {
    var logUser: LogUser = {
      username: username,
      password: password,
    };

    return this.http.post('/user/log-in', logUser, { responseType: 'text' });
  }

  logout() {
    localStorage.clear();
    this.logStatusUser.next(true);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem('jwt');

    if (!isLogged) {
      this.url = url;
      return false;
    }

    return true;
  }
}
