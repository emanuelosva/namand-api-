import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestBusinessUser } from '@namand/interfaces'

export const BusinessUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestBusinessUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
