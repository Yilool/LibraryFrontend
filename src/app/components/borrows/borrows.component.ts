import { Component, OnInit } from '@angular/core';
import { Borrow } from 'src/app/interfaces/borrow';
import { BorrowService } from 'src/app/services/borrow.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.scss'],
})
export class BorrowsComponent implements OnInit {
  usuario = localStorage.getItem('user');
  borrows: Borrow[] = [];
  loading = false; // boleano para mostrar div de notificación
  first = 0;
  rows = 10;

  constructor(private borrowservice: BorrowService) {}

  ngOnInit(): void {
    // establezco el boleano a verdadero
    this.loading = true;
    // obtengo los préstamos
    this.borrowservice.getUsernameBooks(localStorage.getItem('user')).subscribe(
      (res: Borrow[]) => {
        this.borrows = res;
        this.loading = false;
      },
      // notificación de error para casos de errores
      (error) => {
        console.log(error);

        Swal.fire({
          title: `${error.error}`,
          text: 'Exception',
          icon: 'error',
        });
        this.loading = false;
      }
    );
  }

  extendDelivery() {}

  deliveryBook() {}
}
