import { Module, Global } from '@nestjs/common'
import { databaseProvider } from './mondodb.provider'

@Global()
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class MongodbModule {}
