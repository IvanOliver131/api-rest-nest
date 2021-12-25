import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
    private jwtService: JwtService
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await (await this.userService.getByEmail(userEmail));
    const isValidPassword = await bcrypt.compare(userPassword, user.password);
    
    if (user && isValidPassword) {
      const { id, username, name, email } = user;

      return { id, username, name, email };
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    const tokenFormat = {
      hash: token,
      email: user.email
    }
    
    this.tokenService.saveToken(tokenFormat);
    
    const userReturn = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    }

    return {
      userReturn,
      access_token: token,
    };
  }
}
