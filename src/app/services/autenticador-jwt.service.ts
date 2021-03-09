import { Injectable, Output, EventEmitter } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AutenticadorJwtService {
  // output para los roles del usuario
  @Output()
  rol = new EventEmitter<any>();

  roles: string;

  constructor() {}

  /**
   * Permite guardar el jwt (token) recibido.
   */
  almacenaJWT(token: string) {
    // decodifico el token recibido
    const res: any = jwt_decode(token);

    // Guardo el JWT recibido del servidor, el usuario y rol del jwt, en el almacenamiento local
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', res.username);
    localStorage.setItem('roles', res.roles[0]);
  }

  /**
   * Recupera el token (jwt).
   */
  recuperaJWT(): string {
    return localStorage.getItem('jwt');
  }

  /**
   * Elimina el token (jwt) almacenado.
   */
  eliminaJWT() {
    localStorage.removeItem('jwt');
  }
}
