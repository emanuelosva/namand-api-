import { Controller, Post, Delete, Body } from '@nestjs/common'
import { BusinessUser } from '@namand/decorators'
import { RequestBusinessUser } from '@namand/interfaces'
import { AuthService } from './auth.service'
import { CreateAuthDto, RefreskTokenDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/credentials')
  getAuthToken(@Body() credentials: CreateAuthDto) {
    return this.authService.passwordLogin(
      credentials.email,
      credentials.password,
    )
  }

  @Post('/refresh-token')
  refreshAuthToken(@Body() refreskTokenDto: RefreskTokenDto) {
    return this.authService.getRefreshedAuthToken(refreskTokenDto.token)
  }

  @Delete('/refresh-token')
  removeRefreshToken(@Body() refreskTokenDto: RefreskTokenDto) {
    return this.authService.removeRefreshToken(refreskTokenDto.token)
  }

  @Delete('/refresh-token/all')
  removeAllRefreshTokens(@BusinessUser() business: RequestBusinessUser) {
    return this.authService.removeAllRefreshToken(String(business._id))
  }
}
