import { Injectable, Output, EventEmitter } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AutenticadorJwtService {
  @Output()
  rol = new EventEmitter<any>();

  roles: any;

  constructor() {}

  /**
   * Permite guardar el jwt (token) recibido.
   */
  almacenaJWT(token: string) {
    const res: any = jwt_decode(token);
    localStorage.setItem('jwt', token); // Guardo el JWT recibido del servidor, en el almacenamiento local
    localStorage.setItem('user', res.username);
    localStorage.setItem('roles', res.roles);

    this.roles = res.roles;
    this.emitRol();
  }

  /**
   * Emite el rol del usuario logueado
   */
  emitRol() {
    this.rol.emit(this.roles);
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
