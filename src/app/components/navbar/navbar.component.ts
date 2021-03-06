import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // variables
  logedUser = false;
  roles: any;

  // constructor con las inyecciones
  constructor(
    private logService: LogService,
    private router: Router,
    private rol: AutenticadorJwtService
  ) {}

  ngOnInit(): void {
    // pregunta al servicio si esta logueado
    this.logedUser = this.logService.isLoggedIn('');
    this.logService.logStatus$.subscribe((logStat: boolean) => {
      this.logedUser = logStat;
    });
    // me suscribo al output del servicio para obtener los roles
    this.rol.rol.subscribe((res) => {
      this.roles = res;
    });
  }

  // desloguearse
  logout() {
    this.logService.logout();
    this.router.navigate(['/we']);
    this.ngOnInit();
  }

  // funcion para navbar responsive
  myFunction() {
    var nav = document.getElementById('myTopnav');
    if (nav.className === 'topnav') {
      nav.className += ' responsive';
    } else {
      nav.className = 'topnav';
    }
  }
}
