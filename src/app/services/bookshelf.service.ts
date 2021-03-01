import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookshelf } from '../interfaces/bookshelf';

@Injectable({
  providedIn: 'root',
})
export class BookshelfService {
  private endpoint = '/bookshelf';

  constructor(private http: HttpClient) {}

  getBookshelves() {
    return this.http.get(`${this.endpoint}`);
  }

  postBookshelf(bookshelf: Bookshelf) {
    return this.http.post(`${this.endpoint}`, bookshelf);
  }

  getBookshelf(id: number) {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  deleteBookshelf(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
