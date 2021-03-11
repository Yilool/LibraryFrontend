import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Borrow } from '../interfaces/borrow';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  // borrows: Borrow[] = [];
  // @Output()
  // borrowEmiter = new EventEmitter<Borrow[]>();
  private endpoint = '/borrow';

  constructor(private http: HttpClient) {
    // this.getUsernameBooks(localStorage.getItem('user')).subscribe(
    //   (res: Borrow[]) => {
    //     this.borrows = res;
    //     this.emitBorrowsChange(this.borrows);
    //   }
    // );
  }

  getUsernameBooks(username: string) {
    return this.http.get(`${this.endpoint}/user/${username}`);
  }

  borrowBook(borrow: Borrow) {
    return this.http.post(`${this.endpoint}`, borrow);
  }

  extendBorrow(id: number) {
    return this.http.get(`${this.endpoint}/borrow/${id}`);
  }

  delivery(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  // emitBorrowsChange(borrows: Borrow[]) {
  //   this.borrowEmiter.emit(borrows);
  // }
}
