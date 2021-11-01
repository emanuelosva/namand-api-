import { Module } from '@nestjs/common'
import { ServicesService } from './services.service'
import { ServicesController } from './services.controller'
import { ServiceProvider } from './entities'

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServiceProvider],
  exports: [ServicesService],
})
export class ServicesModule {}
