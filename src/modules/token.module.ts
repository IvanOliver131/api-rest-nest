import { TokenController } from './../controllers/token.controller';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from 'src/services/token.service';
import { Token } from 'src/token/token.entity';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
    imports: [
        UserModule,
        // Se utiliza o forwardRef quando temos uma dependencia circular tokenModule e authModule
        forwardRef(() => AuthModule),
        SequelizeModule.forFeature([Token])
    ],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule { }
