import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { LogService } from 'src/app/services/log.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formContent: FormGroup;
  submit = false;
  routeRedirect = '';

  constructor(
    private logService: LogService,
    private router: Router,
    private autenticadorJwtService: AutenticadorJwtService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formContent = new FormGroup({
      username: new FormControl('yiyi', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('yi', [Validators.required]),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.formContent.reset();
  }

  submitForm() {
    Swal.fire({
      title: 'Espere',
      text: 'Iniciando Sesión',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.logService
      .login(
        this.formContent.controls.username.value,
        this.formContent.controls.password.value
      )
      .subscribe((res) => {
        if (res != null && res != undefined) {
          this.autenticadorJwtService.almacenaJWT(res); // Almaceno un nuevo JWT

          this.router.navigate(['/books']);
          this.submit = true;
          this.resetForm();
          this.logService.logStatusUser.next(true);
          Swal.fire({
            title: this.formContent.controls.username.value,
            text: 'Logeado',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Oops...',
            text: 'Username or password invalid',
            icon: 'error',
          });
        }
      });
  }
}
