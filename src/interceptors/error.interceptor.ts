import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

const logger = console

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError((error) => this.handleError(error)))
  }

  private handleError(error: HttpException | Error) {
    if (error instanceof HttpException) this.logOperationalError(error)
    else this.logUnexpectedError(error)

    return throwError(this.parseToHttpResponseError(error))
  }

  parseToHttpResponseError(error: HttpException | Error) {
    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const isServerError = statusCode >= HttpStatus.INTERNAL_SERVER_ERROR

    const statusMessage = isServerError
      ? 'Internal server error'
      : (error as any).getResponse()?.error || 'Error'

    const message =
      statusCode < HttpStatus.INTERNAL_SERVER_ERROR
        ? (error as any).getResponse()?.message || error.message
        : 'Internal error'

    return new HttpException(
      {
        error: true,
        statusCode,
        statusMessage,
        messages: Array.isArray(message) ? message : [message],
      },
      statusCode,
    )
  }

  private logUnexpectedError(error: Error) {
    logger.error(`Unexpected error [${error.name}]: ${error.message}`, {
      stack: error.stack,
    })
  }

  private logOperationalError(error: HttpException) {
    logger.warn(
      `Operational Error: ${error.message} - status: ${error.getStatus()}`,
    )
  }
}
