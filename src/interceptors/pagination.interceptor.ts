import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Request } from 'express'
import { APP } from '@namand/configuration'

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest<Request>()
    return next
      .handle()
      .pipe(map((data) => this.convertToPagination(request, data)))
  }

  private convertToPagination(request: Request, data: any) {
    if (!this.canPaginate(request, data)) return data

    const { total, results } = data
    const {
      page = 1,
      pageSize = APP.paginationLimit,
      ...querys
    } = request.query

    const [_page, _pageSize] = [page, pageSize].map(Number)

    const totalPages = !total ? 1 : Math.ceil(total / _pageSize)
    const correctedSize =
      _page * _pageSize > total
        ? _pageSize - (_page * _pageSize - total)
        : _pageSize

    const hasPrev = page > 1
    const hasNext = totalPages > 1 && _page * _pageSize < total
    const prePage = hasPrev ? _page - 1 : NaN
    const nextPage = hasNext ? _page + 1 : NaN

    const extraQuerys = this.generateExtraQuerys(querys)

    return {
      pagination: {
        page: _page,
        pageSize: correctedSize,
        totalPages,
        totalItems: total,
        hasPrev,
        hasNext,
        prePage,
        nextPage,
        extraQuerys,
      },
      results,
    }
  }

  private canPaginate(request: Request, data: any) {
    const isGet = ['GET', 'get'].includes(request.method)

    const isPaginated =
      Object.prototype.hasOwnProperty.call(data, 'total') &&
      Object.prototype.hasOwnProperty.call(data, 'results')

    return isGet && isPaginated
  }

  private generateExtraQuerys(querys: Record<string, any>) {
    delete querys.page
    delete querys.pageSize
    return new URLSearchParams(querys).toString()
  }
}
