import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  returns: Borrow[] = [];
  loading = false; // boleano para mostrar div de notificación
  first = 0;
  rows = 10;

  constructor(private borrowservice: BorrowService) {}

  ngOnInit(): void {
    // establezco el boleano a verdadero
    this.loading = true;

    // this.borrowservice.borrowEmiter.subscribe((res) => {
    //   this.borrows = res;
    // });
    // this.loading = false;
    // obtengo los préstamos
    this.borrowservice.getUsernameBooks(localStorage.getItem('user')).subscribe(
      (res: Borrow[]) => {
        res.forEach((borrow) => {
          if (!borrow.deleteDate) {
            this.borrows.push(borrow);
          } else {
            this.returns.push(borrow);
          }
        });
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

  // función de extender prestamo
  extendDelivery(id: number) {
    // notificación de confirmación
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      // me suscribo a la respuesta de la notificacion
      if (res.value) {
        // si respuesta afirmativo llamo para ampliar el préstamo
        this.borrowservice.extendBorrow(id).subscribe((res: Borrow) => {
          //suscripción a la extensión para mostrar la extensión de devolución exitoso
          Swal.fire({
            title: `${res.title}`,
            text: `Fecha Devolucion: ${res.deliveryDate}`,
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

  // función de devolver prestamo
  deliveryBook(id: number) {
    // let index;

    // this.borrowservice.delivery(id).subscribe((res: Borrow) => {
    //   for (let i in this.borrows) {
    //     if (this.borrows[i].id == id) {
    //       index = i;
    //     }
    //   }
    //   this.borrows[index] = res;
    //   this.borrowservice.emitBorrowsChange(this.borrows);
    // });
    // notificación de confirmación
    Swal.fire({
      title: 'Confirme la operación',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      // me suscribo a la respuesta de la notificacion
      if (res.value) {
        // si respuesta afirmativo llamo para devolver el préstamo
        this.borrowservice.delivery(id).subscribe((res: Borrow) => {
          //suscripción a la extensión para mostrar la extensión de devolución exitoso
          Swal.fire({
            title: `${res.title}`,
            text: `Devuelto`,
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
