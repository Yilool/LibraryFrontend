import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookshelf } from 'src/app/interfaces/bookshelf';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss'],
})
export class BookshelfComponent implements OnInit {
  // variables
  bookshelf = new Bookshelf();

  // constructor con las inyecciones
  constructor(
    private bookshelfservice: BookshelfService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // metodo de registrar
  registrar(data: NgForm) {
    // notificacion de guardado
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    // spinner de cargando
    Swal.showLoading();

    // llamada al metodo de post del servicio inyectado y suscripcion a ésta
    this.bookshelfservice.postBookshelf(this.bookshelf).subscribe(
      (res) => {
        // notificacion de exito
        Swal.fire({
          title: `Estantería de ${this.bookshelf.genre}`,
          text: 'Creado',
          icon: 'success',
        });
        // redigir a la pagina de estanterias
        this.router.navigate(['/bookshelves']);
      },
      (error) => {
        // notificacion de error
        Swal.fire({
          title: `${error.error}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }
}
