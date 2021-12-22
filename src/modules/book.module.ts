import { Module } from "@nestjs/common";
import { BookController } from "src/controllers/book.controller";
import { BookService } from "src/services/book.service";

@Module({
  controllers: [BookController],
  providers: [
    BookService
  ]
})
export class BookModule {}