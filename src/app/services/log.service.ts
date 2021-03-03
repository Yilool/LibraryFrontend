import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';
import { LogUser } from '../interfaces/logUser';

@Injectable({
  providedIn: 'root',
})
export class LogService implements CanActivate {
  constructor(private http: HttpClient, router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (true) {
      alert('You are not allowed to view this page');
      //this.router.navigate(['/books']);
      //return false to cancel the navigation
      return false;
    }
    return true;
  }

  login(username: string, password: string): Observable<any> {
    var logUser: LogUser = {
      username: username,
      password: password,
      //md5.appendStr(password).end().toString()
    };

    return this.http.post('/user/log-in', logUser, { responseType: 'text' });
  }
}
