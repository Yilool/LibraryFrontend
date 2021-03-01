import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private endpoint = '/book';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(`${this.endpoint}`);
  }

  postBook(book: Book) {
    return this.http.post(`${this.endpoint}`, book);
  }

  putBook(book: Book) {
    return this.http.put(`${this.endpoint}/${book.id}`, book);
  }

  getBook(id: number) {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
