import { Module } from '@nestjs/common'
import { AgendaModule } from '@namand/domains/agenda'
import { StaffsController } from './staffs.controller'
import { StaffsService } from './staffs.service'
import { StaffProvider } from './entities'

@Module({
  imports: [AgendaModule],
  controllers: [StaffsController],
  providers: [StaffsService, StaffProvider],
  exports: [StaffsService],
})
export class StaffsModule {}
