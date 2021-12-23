import { AuthController } from './../controllers/auth.controller';
import { AuthService } from './../services/auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user.module';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { jwtConstants } from './shared/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from 'src/services/token.service';
import { TokenModule } from 'src/modules/token.module';

@Module({
    imports: [
        UserModule,
        TokenModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
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
