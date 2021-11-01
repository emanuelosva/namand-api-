import { Module } from '@nestjs/common'

import { MongodbModule } from '@namand/infrastructure/mongodb/mongodb.module'
import { AuthModule } from '@namand/domains/auth/auth.module'

import { AppointmentsModule } from '@namand/domains/appointments/appointments.module'
import { AgendaModule } from '@namand/domains/agenda/agenda.module'
import { StaffsModule } from '@namand/domains/staffs/staffs.module'
import { BusinessModule } from '@namand/domains/business/business.module'
import { CustomerModule } from '@namand/domains/customer/customer.module'
import { ServicesModule } from './domains/services/services.module'

@Module({
  imports: [
    /** @InfrastructureModules */
    MongodbModule,

    /** @HttpRestModules */
    AuthModule,
    BusinessModule,
    StaffsModule,
    AgendaModule,
    AppointmentsModule,
    CustomerModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
