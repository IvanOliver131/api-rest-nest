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
    try {
      const listBooks = this.bookModel.findAll();

      return listBooks;
    } catch (error) {
      return error;
    }
  }

  async listOneBook(id: number): Promise<Book> {
    try {
      return this.bookModel.findByPk(id);
    } catch (error) {
      return error;
    }
  }

  async createBook(book: Book): Promise<Book> {
    try {
      const bookCreated = this.bookModel.create(book);

      return bookCreated;
    } catch (error) {
      return error;
    } 
  }

  async updateBook(idBook: number, book: Book) {
    try {
      this.bookModel.update(book, {
        where: {
          id: idBook
        }
      });
  
      return book;
    } catch (error) {
      return error;
    }
  }

  async deleteBook(id: number) {
    try {
      const bookDeleted: Book = await this.listOneBook(id);
      return bookDeleted.destroy();
    } catch (error){
      return error;
    }
  }
}