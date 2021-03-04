import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  logedUser = false;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logedUser = this.logService.isLoggedIn('');
    this.logService.logStatus$.subscribe((logStat: boolean) => {
      this.logedUser = logStat;
    });
  }

  logout() {
    this.logService.logout();
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
