import { Module } from '@nestjs/common'
import { AppointmentsModule } from './domains/appointments/appointments.module'
import { AgendaModule } from './domains/agenda/agenda.module'
import { StaffsModule } from './domains/staffs/staffs.module'
import { BusinessModule } from './domains/business/business.module'

@Module({
  imports: [BusinessModule, StaffsModule, AgendaModule, AppointmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
