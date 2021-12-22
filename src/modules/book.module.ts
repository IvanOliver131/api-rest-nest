import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookController } from "src/controllers/book.controller";
import { Book } from "src/models/book.model";
import { BookService } from "src/services/book.service";

@Module({
  imports: [
    SequelizeModule.forFeature([Book])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}