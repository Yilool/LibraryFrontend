import { Component, OnInit } from '@angular/core';
import { Bookshelf } from 'src/app/interfaces/bookshelf';
import { Table } from 'primeng/table';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import Swal from 'sweetalert2';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';

@Component({
  selector: 'app-bookshelves',
  templateUrl: './bookshelves.component.html',
  styleUrls: ['./bookshelves.component.scss'],
})
export class BookshelvesComponent implements OnInit {
  // variable
  bookshelves: Bookshelf[] = [];
  admin = false;
  loading = false; // boleano para mostrar div de notificación
  first = 0;
  rows = 10;

  // contructur con inyecciones de servicios
  constructor(private bookshelfservice: BookshelfService) {}

  ngOnInit(): void {
    if (localStorage.getItem('roles') === 'ADMIN') {
      this.admin = true;
    }

    // establezco el boleano a verdadero
    this.loading = true;
    // obtengo las estanterías
    this.bookshelfservice.getBookshelves().subscribe(
      // subscrición
      (res: Bookshelf[]) => {
        this.bookshelves = res;

        this.loading = false;
      },
      // notificación de error para casos de errores
      (error) => {
        Swal.fire({
          title: `${error.error}`,
          text: 'Exception',
          icon: 'error',
        });
        this.loading = false;
      }
    );
  }

  // función de borrado
  borrar(bookshelf: Bookshelf) {
    // notificación de confirmación
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      // me suscrivo a la respuesta de la notificacion
      if (res.value) {
        // si respuesta afirmativo llamoa para borrar la estantería
        this.bookshelfservice.deleteBookshelf(bookshelf.id).subscribe((res) => {
          //suscripción al borrado para mostrar el borrado exitoso
          Swal.fire({
            title: `Estantería de ${bookshelf.genre}`,
            text: 'Eliminado',
            icon: 'success',
          });
          // reinicio el componente
          this.ngOnInit();
        });
      } else {
        // si respuesta negativa, notifico la cancelacion de la operación
        Swal.fire({
          title: `Operación cancelado`,
          text: 'Cancelada',
          icon: 'error',
        });
      }
    });
  }
}
