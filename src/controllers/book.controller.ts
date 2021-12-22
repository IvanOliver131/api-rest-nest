import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookService } from 'src/services/book.service';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService){}

  @Get()
  async listAllBooks(): Promise<Book[]> {
    const listBooks = await this.bookService.listAllBooks();

    return listBooks;
  }

  @Get(':id')
  async listOneBook(@Param() params): Promise<Book> {
    const listBook = await this.bookService.listOneBook(params.id); 

    return listBook;
  }

  @Post()
  async createBook(@Body() book): Promise<Book> {
    const bookCreated = await this.bookService.createBook(book); 

    return bookCreated;
  }

  @Put(':id')
  async updateBook(@Body() book): Promise<[number, Book[]]> {
    const bookUpdated = await this.bookService.updateBook(book); 

    return bookUpdated;
  }

  @Delete(':id')
  async deleteBook(@Param() params) {
    const bookDeleted = await this.bookService.deleteBook(params.id);

    return bookDeleted;
  }
}
