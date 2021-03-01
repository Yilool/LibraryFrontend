import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookshelf } from 'src/app/interfaces/bookshelf';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss'],
})
export class BookshelfComponent implements OnInit {
  bookshelf = new Bookshelf();

  constructor(
    private bookshelfservice: BookshelfService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registrar(data: NgForm) {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.bookshelfservice.postBookshelf(this.bookshelf).subscribe((res) => {
      Swal.fire({
        title: `Estantería de ${this.bookshelf.genre}`,
        text: 'Creado',
        icon: 'success',
      });
      this.router.navigate(['/bookshelves']);
    });
  }
}
