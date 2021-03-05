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
  library: Book[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookservice.getBooks().subscribe(
      (res: Book[]) => {
        this.library = res;

        this.loading = false;
      },
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

  borrar(book: Book) {
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      console.log(res);

      if (res.value) {
        this.bookservice.deleteBook(book.id).subscribe((res) => {
          Swal.fire({
            title: `${book.title}`,
            text: 'Eliminado',
            icon: 'success',
          });
        });
        this.ngOnInit();
      }
    });
  }
}
