import { Component, OnInit } from '@angular/core';
import { Bookshelf } from 'src/app/interfaces/bookshelf';
import { Table } from 'primeng/table';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookshelves',
  templateUrl: './bookshelves.component.html',
  styleUrls: ['./bookshelves.component.scss'],
})
export class BookshelvesComponent implements OnInit {
  bookshelves: Bookshelf[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private bookshelfservice: BookshelfService) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookshelfservice.getBookshelves().subscribe((res: Bookshelf[]) => {
      this.bookshelves = res;

      this.loading = false;
    });
  }

  borrar(bookshelf: Bookshelf) {
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.value) {
        this.bookshelfservice.deleteBookshelf(bookshelf.id).subscribe((res) => {
          Swal.fire({
            title: `Estantería de ${bookshelf.genre}`,
            text: 'Eliminado',
            icon: 'success',
          });
          this.ngOnInit();
        });
      }
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.bookshelves ? this.first === this.bookshelves.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.bookshelves ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }
}
