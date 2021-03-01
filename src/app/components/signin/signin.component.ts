import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  formContent: FormGroup;
  submit = true;

  constructor(
    private signService: SignService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  resetForm(): void {
    this.submit = false;
    this.formContent.reset();
  }

  submitForm() {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.signService.signin(
      this.formContent.controls.name.value,
      this.formContent.controls.surname.value,
      this.formContent.controls.dni.value,
      this.formContent.controls.birthdate.value,
      this.formContent.controls.number.value,
      this.formContent.controls.username.value,
      this.formContent.controls.password.value
    ).subscribe((res: any) => {
      Swal.fire({
        title: res.username,
        text: 'Creado',
        icon: 'success',
      });
      this.router.navigate(['/login']);
      this.submit = true;
      this.resetForm();
    });
  }
}
