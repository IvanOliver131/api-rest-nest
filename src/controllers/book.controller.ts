import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookService } from 'src/services/book.service';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService){}

  @Get()
  listAllBooks(): Book[] {
    const listBooks = this.bookService.listAllBooks();

    return listBooks;
  }

  @Get(':id')
  listOneBook(@Param() params): Book {
    const listBook = this.bookService.listOneBook(params.id); 

    return listBook;
  }

  @Post()
  createBook(@Body() book): Book {
    const bookCreated = this.bookService.createBook(book); 

    return bookCreated;
  }

  @Put(':id')
  updateBook(@Body() book): Book {
    const bookUpdated = this.bookService.updateBook(book); 

    return bookUpdated;
  }

  @Delete(':id')
  deleteBook(@Param() params): Object {
    const bookDeleted = this.bookService.deleteBook(params.id);

    return bookDeleted;
  }
}
