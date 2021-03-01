import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book = new Book();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      let ident = Number(id);
      this.bookService.getBook(ident).subscribe((res: Book) => {
        this.book = res;
        this.book.id = ident;
      });
    }
  }

  postBook(data: NgForm) {
    Swal.fire({
      title: 'Espere',
      text: 'Registrando libro',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.bookService.postBook(this.book).subscribe((res) => {
      Swal.fire({
        title: `${this.book.title} de ${this.book.author}`,
        text: 'Creado',
        icon: 'success',
      });
      this.router.navigate(['/books']);
    });
  }
}
