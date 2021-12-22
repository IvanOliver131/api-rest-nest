import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book.module';

@Module({
  imports: [
    BookModule
  ],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
