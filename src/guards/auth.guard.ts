import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ErrorsInterceptor } from '@namand/interceptors'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly errorInterceptor = new ErrorsInterceptor()) {
    super()
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(error, user) {
    if (error || !user) {
      throw this.errorInterceptor.parseToHttpResponseError(
        new UnauthorizedException('Invalid credentials'),
      )
    }
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      slug: user.slug,
      currency: user.currency,
      timezone: user.timezone,
      createdAt: user.createdAt,
    } as any
  }
}
