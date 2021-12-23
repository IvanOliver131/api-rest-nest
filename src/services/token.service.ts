import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "src/token/token.entity";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token)
    private tokenModel: typeof Token
  ){}

  async saveToken(token: any) {
    this.tokenModel.create(token)  
  }
}