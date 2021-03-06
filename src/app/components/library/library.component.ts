import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  // variable
  library: Book[] = [];
  loading = false; // boleano para mostrar div de notificación
  first = 0;
  rows = 10;

  // contructur con inyecciones de servicios
  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
    // establezco el boleano a verdadero
    this.loading = true;
    // obtengo los libros
    this.bookservice.getBooks().subscribe(
      // subscrición
      (res: Book[]) => {
        this.library = res;

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
  borrar(book: Book) {
    // notificación de confirmación
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      // me suscribo a la respuesta de la notificacion
      if (res.value) {
        // si respuesta afirmativo llamo para borrar la estantería
        this.bookservice.deleteBook(book.id).subscribe((res) => {
          //suscripción al borrado para mostrar el borrado exitoso
          Swal.fire({
            title: `${book.title}`,
            text: 'Eliminado',
            icon: 'success',
          });
        });
        // reinicio el componente
        this.ngOnInit();
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
