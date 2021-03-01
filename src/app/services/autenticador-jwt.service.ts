import { Injectable } from '@angular/core';

/**
 * Los servicios son, por defecto, inyectables
 */
@Injectable({
  providedIn: 'root'
})

export class AutenticadorJwtService {
  // La siguiente propiedad sólo estará activa por sesión de usuario.
  jwtPorSesion: string; // Sólo utilizada si se desea que un mismo navegador pueda tener varias sesiones

  constructor() { }

  /**
   * Permite guardar el jwt (token) recibido. Dejaremos comentada la línea que no queramos usar.
   * @param token 
   */
  almacenaJWT (token: string) {
//    this.jwtPorSesion = token;   // Almacenamiento en la variable
    localStorage.setItem("jwt", token);  // Guardo el JWT recibido del servidor, en el almacenamiento local
  }

  /**
   * Recupera el token (jwt). Puede hacerlo de una variable o del localStorage, según queramos.
   */
  recuperaJWT (): string {
//    return this.jwtPorSesion;
    return localStorage.getItem("jwt");
  }

  /**
   * Elimina el token (jwt) almacenado.
   */
  eliminaJWT () {
//    this.jwtPorSesion = null;
    localStorage.removeItem("jwt");
  }

}
