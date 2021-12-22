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

  async updateBook(book: Book): Promise<[number, Book[]]> {
    return this.bookModel.update(book, {
      where: {
        id: book.id
      }
    });
  }

  async deleteBook(id: number) {
    const book: Book = await this.listOneBook(id);
    book.destroy();
  }
}