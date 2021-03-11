import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Borrow } from '../interfaces/borrow';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  private endpoint = '/borrow';

  constructor(private http: HttpClient) { }

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
}
