import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate {
  // constructor con las inyecciones
  constructor(private logService: LogService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // verifica si está logeado preguntando al servicio
    if (this.logService.isLoggedIn(state.url)) {
      return true;
    }

    // sino lo esta, notifico que se debe loguearse
    Swal.fire({
      title: 'Usted no está logeado',
      text: 'Para usar los siquientes servicios debe loguearse',
      icon: 'error',
    });
    
    // redireciono al login
    this.router.navigate(['login']);

    return false;
  }
}
