import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookService } from 'src/services/book.service';
import express, {Request, Response} from 'express';

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
  async updateBook(@Param() params, @Body() book, @Res() res: Response): Promise<any> {
    try {
      const idBook = params.id;
      const searchBook: Book = await this.bookService.listOneBook(idBook);

      if (searchBook) {
        const bookUpdated = await this.bookService.updateBook(idBook, book); 
        
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          body: {
            message: `Book be updated `,
            newDates: bookUpdated
          }
        });
      } 

      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        body: {
          message: "Error at update book"
        }
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        body: {
          message: "Error at update book"
        }
      })
    }
    
  }

  @Delete(':id')
  async deleteBook(@Param() params) {
    const bookDeleted = await this.bookService.deleteBook(params.id);

    return bookDeleted;
  }
}
