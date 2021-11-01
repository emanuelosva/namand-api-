import { Module } from '@nestjs/common'
import { AgendaService } from './agenda.service'
import { TimeOffService } from './timeOff.service'
import { AgendaController } from './agenda.controller'
import { TimeOffController } from './timeOff.controller'
import { AgendaProvider, TimeOffProvider } from './entities'

@Module({
  controllers: [AgendaController, TimeOffController],
  providers: [AgendaService, TimeOffService, AgendaProvider, TimeOffProvider],
  exports: [AgendaService],
})
export class AgendaModule {}
