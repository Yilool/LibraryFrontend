import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { Bookshelf } from 'src/app/interfaces/bookshelf';
import { BookService } from 'src/app/services/book.service';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  // variables
  book = new Book();
  bookshelves: Bookshelf[] = [];
  bookshelf: string;

  // constructor con las inyecciones
  constructor(
    private bookshelfservice: BookshelfService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // antes de iniciar el componente
  ngOnInit(): void {
    // obtiene lo que hay en ultimo lugar de la ruta, donde se marcó :id
    const id = this.route.snapshot.paramMap.get('id');

    // si no es new se pasa a number y llama al servicio para obtener el libro de la base de datos
    if (id !== 'new') {
      let ident = Number(id);
      this.bookService.getBook(ident).subscribe((res: Book) => {
        this.book = res;
        this.book.id = ident;
      });
    }

    // se obtiene las estanterías disponibles en la base de datos y se suscribe para obtener la respuesta
    this.bookshelfservice.getBookshelves().subscribe(
      (res: Bookshelf[]) => {
        this.bookshelves = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }

  // si la ruta es new se hace un post y si no se realizará un put
  postPut(data: NgForm) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.putBook(data);
    } else {
      this.postBook(data);
    }
  }

  // se obtine los datos del formulario para realizar la modificación
  putBook(data: NgForm) {
    // notificación para evitar otras acciones
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando libro',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.bookService.putBook(this.book).subscribe(
      // notificación de exito
      (res) => {
        Swal.fire({
          title: `${this.book.title} de ${this.book.author}`,
          text: 'Actualizado',
          icon: 'success',
        });
        // redireccionado a la páginas de libros
        this.router.navigate(['/books']);
      },
      // notificacion de errores
      (error) => {
        Swal.fire({
          title: `${error.error}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }

  // se obtine los datos del formulario para realizar la modificación
  postBook(data: NgForm) {
    // notificación para evitar otras acciones
    Swal.fire({
      title: 'Espere',
      text: 'Registrando libro',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.bookService.postBook(this.book).subscribe(
      // notificación de exito
      (res) => {
        Swal.fire({
          title: `${this.book.title} de ${this.book.author}`,
          text: 'Creado',
          icon: 'success',
        });
        // redireccionado a la páginas de libros
        this.router.navigate(['/books']);
      },
      // notificacion de errores
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
