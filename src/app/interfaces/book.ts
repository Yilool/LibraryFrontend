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

  // cada objeto de estaclase que se cree estará a false
  constructor() {
    this.borrow = false;
  }
}
