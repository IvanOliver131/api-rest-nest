import { Injectable } from "@nestjs/common";
import { Book } from "src/models/book.model";

@Injectable()
export class BookService {
  private books: Array<Book> = [
    // new Book({
    //   id: 1,
    //   code: "LIV01", 
    //   name: "teste 1", 
    //   price: 29.90
    // }),
    // new Book({
    //   id: 2,
    //   code: "LIV02", 
    //   name: "teste 2", 
    //   price: 39.90
    // }),
    // new Book({
    //   id: 3,
    //   code: "LIV03", 
    //   name: "teste 3", 
    //   price: 49.90
    // }),
  ]

  listAllBooks(): Book[]{
    return this.books;
  }

  listOneBook(id: number): Book {
    return this.books[id-1];
  }

  createBook(book: Book): Book {
    this.books.push(book);

    return book;
  }

  updateBook(book: Book): Book {
    return book;
  }

  deleteBook(id: number): Object {
    return {
      message: `Book ${id} deleted with succes`
    }
  }
}