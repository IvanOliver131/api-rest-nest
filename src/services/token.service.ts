import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "src/token/token.entity";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

// Meu token service so pode usar o userService se ele for exportado e se importar o userModeul
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token)
    private tokenModel: typeof Token,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ){}

  async saveToken(token: any) {
    let objToken = await this.tokenModel.findOne({
      where: {
          email: token.email
      }
    });

    if (objToken) {
      this.tokenModel.update(token, {
        where: {
          id: objToken.id
        }
      });
    } else {
      this.tokenModel.create(token);  
    } 
  }

  async refreshToken(oldToken: string) {
    let objToken = await this.tokenModel.findOne({
      where: {
          hash: oldToken
      }
    }); 

    if (objToken) {
      let user = await this.userService.getByEmail(objToken.email);
      
      return this.authService.login(user);
    } else {
      return new HttpException({
        errorMessage: 'Token Invalido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}