import { Module } from '@nestjs/common'
import { BusinessService } from './business.service'
import { BusinessController } from './business.controller'
import { BusinessProvider } from './entities'

@Module({
  controllers: [BusinessController],
  providers: [BusinessService, BusinessProvider],
  exports: [BusinessService],
})
export class BusinessModule {}
