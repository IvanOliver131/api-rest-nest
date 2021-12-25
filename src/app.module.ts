import { TokenModule } from './modules/token.module';
import { AuthModule } from './modules/auth.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './models/book.model';
import { BookModule } from './modules/book.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/user.model';
import { UserModule } from './modules/user.module';
import { Token } from './token/token.entity';

@Module({
  imports: [
    TokenModule,
    AuthModule,
    UserModule,
    BookModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.HOST_ENV,
      port: 3306,
      username: process.env.USERNAME_ENV,
      password: process.env.PASSWORD_ENV,
      database: process.env.DATABASE_ENV,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Book, User, Token])
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
