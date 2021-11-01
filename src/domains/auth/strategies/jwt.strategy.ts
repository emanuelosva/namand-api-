import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AUTH } from '@namand/configuration'
import { BusinessService } from '@namand/domains/business'
import { JwtPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly businessService: BusinessService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH.jwtTokenSecret,
    })
  }

  async validate(payload: JwtPayload) {
    const businessUser = await this.businessService.findOne(payload.id)
    if (!businessUser) throw new UnauthorizedException('Invalid credentials')
    return businessUser
  }
}
