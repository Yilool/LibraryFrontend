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
  logedUser = false;
  roles: any;

  constructor(
    private logService: LogService,
    private router: Router,
    private rol: AutenticadorJwtService
  ) {}

  ngOnInit(): void {
    this.logedUser = this.logService.isLoggedIn('');
    this.logService.logStatus$.subscribe((logStat: boolean) => {
      this.logedUser = logStat;
    });
    this.rol.rol.subscribe((res) => {
      this.roles = res;
    });
  }

  logout() {
    this.logService.logout();
    this.router.navigate(['/login']);
    this.ngOnInit();
  }

  myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
}
