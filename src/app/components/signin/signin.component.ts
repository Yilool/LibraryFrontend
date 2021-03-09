import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  // variable
  formContent: FormGroup; // formulario
  submit = false;

  // constructor con las inyecciones
  constructor(private signService: SignService, private router: Router) {}

  ngOnInit(): void {
    // creo el formularios y sus campos con la validaciones
    this.formContent = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      birthdate: new FormControl('', [Validators.required]),
      number: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
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
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // llamo al servicio para enviar los datos del formulario
    this.signService
      .signin(
        this.formContent.controls.name.value,
        this.formContent.controls.surname.value,
        this.formContent.controls.dni.value,
        this.formContent.controls.birthdate.value,
        this.formContent.controls.number.value,
        this.formContent.controls.username.value,
        this.formContent.controls.password.value
      )
      // me suscribo a la respuesta
      .subscribe(
        // si no es erronea notifico
        (res: any) => {
          Swal.fire({
            title: res.username,
            text: 'Creado',
            icon: 'success',
          });
          // redirijo a login
          this.router.navigate(['/login']);
          this.submit = true;
          this.resetForm();
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
