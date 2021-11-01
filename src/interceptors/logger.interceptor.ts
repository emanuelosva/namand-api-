import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Logger } from '@namand/utils'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new Logger()

    const now = new Date()
    const request = ctx.switchToHttp().getRequest()
    const url = request.originalUrl
    const method = request.method.toUpperCase()
    const ip = request.ip || request.headers['x-forwared-for']

    const requestLog = `Req | [${method} ${url}] - ${now.toISOString()} - ip -> ${ip}`
    const makeResponseLog = (date: number, error?: HttpException) =>
      `Res | [${method} ${url}] - ${now.toISOString()} - ip -> ${ip} - Time: ${
        date - +now
      }ms - Status: ${error?.getStatus() || 200}${
        error ? ` Error - ${error.message}` : ''
      }`

    logger.info(requestLog)

    return next.handle().pipe(
      tap(
        () => logger.info(makeResponseLog(Date.now())),
        (error) => logger.info(makeResponseLog(Date.now(), error)),
      ),
    )
  }
}
