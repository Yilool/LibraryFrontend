import { Injectable, Output, EventEmitter } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AutenticadorJwtService {
  // output para los roles del usuario
  @Output()
  rol = new EventEmitter<any>();

  roles: any;

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
    localStorage.setItem('roles', res.roles);

    // igualo el rol del jwt a una variable global
    this.roles = res.roles;
    // emito el los roles para otros componentes
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
