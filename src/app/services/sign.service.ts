import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  constructor(private http: HttpClient) {}

  signin(
    name: string,
    surname: string,
    dni: string,
    birthdate: string,
    number: string,
    username: string,
    password: string
  ) {
    const md5 = new Md5();

    var jsonObject = {
      name: name,
      surname: surname,
      dni: dni,
      birthdate: birthdate,
      number: number,
      username: username,
      password: password
      //md5.appendStr(password).end().toString()
    };

    return this.http.post('/user/sign-in', jsonObject);
  }
}
