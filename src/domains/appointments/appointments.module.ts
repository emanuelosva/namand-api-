import { Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { AppointmentProvider } from './entities'
import { StaffsModule } from '@namand/domains/staffs'
import { CustomerModule } from '@namand/domains/customer'
import { ServicesModule } from '@namand/domains/services'

@Module({
  imports: [StaffsModule, CustomerModule, ServicesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentProvider],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
