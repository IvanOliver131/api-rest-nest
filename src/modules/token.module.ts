import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from 'src/services/token.service';
import { Token } from 'src/token/token.entity';

@Module({
    imports: [
        SequelizeModule.forFeature([Token])
    ],
    controllers: [],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule { }
