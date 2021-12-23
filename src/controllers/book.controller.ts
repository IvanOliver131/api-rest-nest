import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Book } from 'src/models/book.model';
import { BookService } from 'src/services/book.service';
import express, {Request, Response} from 'express';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService){}

  @Get()
  async listAllBooks(): Promise<Book[]> {
    try {
      const listBooks = await this.bookService.listAllBooks();

      return listBooks;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async listOneBook(@Param() params): Promise<Book> {
    try {
      const listBook = await this.bookService.listOneBook(params.id); 

      return listBook;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createBook(@Body() book): Promise<Book> {
    try {
      const bookCreated = await this.bookService.createBook(book); 

      return bookCreated;
    } catch (error) {
      return error;
    }  
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
            message: `Book updated `,
            newData: bookUpdated
          }
        });
      } 

      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Book not found."
        }
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error update book"
        }
      })
    }
    
  }

  @Delete(':id')
  async deleteBook(@Param() params, @Res() res: Response) {
    try {
      const idBook = params.id;
      const searchBook: Book = await this.bookService.listOneBook(idBook);

      if (searchBook) {
        const bookDeleted = await this.bookService.deleteBook(params.id);

        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          body: {
            message: "Book deleted",
            newData: bookDeleted
          }
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: 404,
        body: {
          message: "Book not found",
        }
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        body: {
          message: "Error delete book."
        }
      });
    }
  }
}
