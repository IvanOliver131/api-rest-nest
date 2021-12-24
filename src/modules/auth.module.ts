import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user.module';
import { LocalStrategy } from '../auth/shared/local.strategy';
import { JwtStrategy } from '../auth/shared/jwt.strategy';
import { jwtConstants } from '../auth/shared/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from './token.module';

@Module({
    imports: [
        UserModule,
        TokenModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '15m' },
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        AuthService
    ]

})
export class AuthModule { }
