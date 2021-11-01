import { Module } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import { CustomerProvider } from './entities'

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerProvider],
  exports: [CustomerService],
})
export class CustomerModule {}
