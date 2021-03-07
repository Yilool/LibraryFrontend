import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router
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

    // establezco que la respuesta de la peticion será de tipo texto
    return this.http.post('/user/log-in', logUser, { responseType: 'text' });
  }

  logout() {
    // borra los datos del almacenamiento local
    localStorage.clear();
    this.logStatusUser.next(true);
  }

  // determina si está el usuario logueado intentando obtener el jwt del almacenamiento local
  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem('jwt');

    if (!isLogged) {
      this.url = url;
      return false;
    }

    return true;
  }
}
