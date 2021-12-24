import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDto } from 'src/dto/refresh.token.dto';
import { TokenService } from 'src/services/token.service';

@Controller('token')
export class TokenController { 
  constructor(
    private TokenService: TokenService
  ){}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.TokenService.refreshToken(data.oldToken)
  }
}
