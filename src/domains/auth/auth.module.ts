import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { BusinessModule } from '@namand/domains/business'
import { AUTH } from '@namand/configuration'
import { AuthService } from './auth.service'
import { RefeshTokenProvider } from './entities'
import { JwtStrategy } from './strategies'

@Module({
  imports: [
    BusinessModule,
    PassportModule,
    JwtModule.register({
      secret: AUTH.jwtTokenSecret,
    }),
  ],
  providers: [AuthService, RefeshTokenProvider, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
