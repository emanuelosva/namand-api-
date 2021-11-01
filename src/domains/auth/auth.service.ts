import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AUTH, APP } from '@namand/configuration'
import { InjectModel } from '@namand/providers'
import { MongooseModel } from '@namand/interfaces'
import { BusinessService } from '@namand/domains/business'
import { RefeshToken } from './entities'
import { Hasher } from '@namand/utils'

export type JwtPayload = {
  id: string
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefeshToken)
    private readonly refreshTokenModel: MongooseModel<RefeshToken>,
    private readonly businessService: BusinessService,
    private readonly jwtService: JwtService,
  ) {}

  async passwordLogin(email: string, password: string) {
    const business = await this.businessService.findByEmail(email)

    const canLoginIn =
      business && (await Hasher.compareHash(password, business.password))
    if (!canLoginIn) throw new UnauthorizedException('Invalid credentials')

    const refreshToken = await this.createRefreshToken(business._id)
    const authToken = await this.encodeJwt({ id: business._id })

    return { refreshToken, authToken }
  }

  createRefreshToken(business: string) {
    return this.refreshTokenModel.create({ business })
  }

  async getRefreshedAuthToken(token: string) {
    const refreshToken = await this.refreshTokenModel.findOne({ token }).lean()
    if (!refreshToken) throw new UnauthorizedException('Invalid credentials')

    return this.encodeJwt({ id: String(refreshToken.business) })
  }

  removeRefreshToken(token: string) {
    return this.refreshTokenModel.deleteOne({ token })
  }

  removeAllRefreshToken(business: string) {
    return this.refreshTokenModel.deleteMany({ business })
  }

  async encodeJwt(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: AUTH.expiresIn,
      algorithm: AUTH.algorithm,
      audience: APP.name,
      subject: APP.name,
    })
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, { algorithms: [AUTH.algorithm] })
  }
}
