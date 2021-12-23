import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
