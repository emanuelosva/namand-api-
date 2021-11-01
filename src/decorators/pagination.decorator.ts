import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { APP } from '@namand/configuration'
import { PaginationQuery } from '@namand/interfaces'

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQuery => {
    const request = ctx.switchToHttp().getRequest()

    const { page = 1, pageSize = APP.paginationLimit } = request.query
    const skip = (+page - 1) * +pageSize
    const limit = +skip + +pageSize

    return { skip, limit }
  },
)
