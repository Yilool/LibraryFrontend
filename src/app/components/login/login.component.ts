import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { LogService } from 'src/app/services/log.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // variable
  formContent: FormGroup; // formulario
  submit = false;
  routeRedirect = '';

  // constructor con las inyecciones
  constructor(
    private logService: LogService,
    private router: Router,
    private autenticadorJwtService: AutenticadorJwtService
  ) {}

  ngOnInit(): void {
    // creo el formularios y sus campos con la validaciones
    this.formContent = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // resetea el formulario y establece false
  resetForm(): void {
    this.submit = false;
    this.formContent.reset();
  }

  // envía el formulario
  submitForm() {
    // notificación de cargando para evitar mas acciones
    Swal.fire({
      title: 'Espere',
      text: 'Iniciando Sesión',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // llamo al servicio para enviar los datos del formulario
    this.logService
      .login(
        this.formContent.controls.username.value,
        this.formContent.controls.password.value
      )
      // me suscribo a la respuesta
      .subscribe(
        // si no es erronea
        (res) => {
          // compruebo si la respuesta en nula o indefinida
          if (res != null && res != undefined) {
            // si no lo es
            this.autenticadorJwtService.almacenaJWT(res); // Almaceno un nuevo JWT
            // redirecciono a la pagina de nosotros
            this.router.navigate(['/we']);
            this.submit = true;
            this.resetForm();
            // establezco el observable del estado de login del servicio a verdadero = logeado
            this.logService.logStatusUser.next(true);
            // notifico el estado
            Swal.fire({
              title: this.formContent.controls.username.value,
              text: 'Logeado',
              icon: 'success',
            });
          } else {
            // si lo es, notifico si el nombre de usuario o contaseña es valido
            Swal.fire({
              title: 'Oops...',
              text: 'Username o password invalido',
              icon: 'error',
            });
          }
        },
        // si es erronea notifico el error
        (error) => {
          Swal.fire({
            title: `${error.error}`,
            text: 'Exception',
            icon: 'error',
          });
        }
      );
  }
}
