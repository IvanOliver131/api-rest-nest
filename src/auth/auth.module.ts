import { AuthController } from './../controllers/auth.controller';
import { AuthService } from './../services/auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user.module';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { jwtConstants } from './shared/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        UserModule,
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
})
export class AuthModule { }
