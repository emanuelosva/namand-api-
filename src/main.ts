import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import * as compression from 'compression'
import { AppModule } from '@namand/app.module'
import { ValidationPipe } from '@namand/pipes'
import { LoggerInterceptor, ErrorsInterceptor } from '@namand/interceptors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app
    // Security
    .use(helmet())
    // Request Parsers
    .use(compression())
    .useGlobalPipes(new ValidationPipe())
    // Interceptors
    .useGlobalInterceptors(new LoggerInterceptor(), new ErrorsInterceptor())

  await app.listen(3000)
}
bootstrap()
