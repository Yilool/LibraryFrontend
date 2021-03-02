import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AutenticadorJwtService {
  constructor() { }

  /**
   * Permite guardar el jwt (token) recibido.
   */
  almacenaJWT (token: string) {
    const res: any = jwt_decode(token);
    localStorage.setItem("jwt", token);  // Guardo el JWT recibido del servidor, en el almacenamiento local
    localStorage.setItem("user", res.username); 
    localStorage.setItem("roles", res.roles); 
    
  }

  /**
   * Recupera el token (jwt).
   */
  recuperaJWT (): string {
    return localStorage.getItem("jwt");
  }

  /**
   * Elimina el token (jwt) almacenado.
   */
  eliminaJWT () {
    localStorage.removeItem("jwt");
  }

}
