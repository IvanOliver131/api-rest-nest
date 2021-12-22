import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "src/models/book.model";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book
  ) {}

  async listAllBooks(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async listOneBook(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async createBook(book: Book): Promise<Book> {
    this.bookModel.create(book);

    return book;
  }

  async updateBook(idBook: number, book: Book) {
    this.bookModel.update(book, {
      where: {
        id: idBook
      }
    });

    return book;
  }

  async deleteBook(id: number) {
    const bookDeleted: Book = await this.listOneBook(id);
    bookDeleted.destroy();
  }
}