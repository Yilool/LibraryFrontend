export class Book {
  id?: number;
  title: string;
  pages: number;
  author: string;
  publisher: string;
  edition: string;
  isbn: string;
  bookShelf: string;
  borrow: boolean;

  constructor() {
    this.borrow = false;
  }
}
