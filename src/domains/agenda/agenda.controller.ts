import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common'
import { ParseToBool, ParseToInt, ParseToMongoId } from '@namand/pipes'
import { AgendaService } from './agenda.service'
import {
  CreateAgendaDto,
  CreateBreakDto,
  UpdateAgendaDto,
  UpdateBreakDto,
  UpdateDayPlanDto,
} from './dto'
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto)
  }

  @Get(':idOrStaffId')
  findOne(
    @Param('idOrStaffId', ParseToMongoId) idOrStaffId: string,
    @Query('byStaff', ParseToBool) bystaff: boolean,
  ) {
    return bystaff
      ? this.agendaService.findByStaffId(idOrStaffId)
      : this.agendaService.findById(idOrStaffId)
  }

  @Put(':id')
  update(
    @Param('id', ParseToMongoId) id: string,
    @Body() updateAgendaDto: UpdateAgendaDto,
  ) {
    return this.agendaService.update(id, updateAgendaDto)
  }

  @Put(':id/dayplan/:dayNumber')
  updateDayPlan(
    @Param('id', ParseToMongoId) id: string,
    @Param('dayNumber', ParseToInt) dayNumber: number,
    @Body() updateDayPlanDto: UpdateDayPlanDto,
  ) {
    return this.agendaService.updateDayPlan(id, { updateDayPlanDto, dayNumber })
  }

  @Post(':id/dayplan/:dayNumber/breaks')
  createBreak(
    @Param('id', ParseToMongoId) id: string,
    @Param('dayNumber', ParseToInt) dayNumber: number,
    @Body() createBreakDto: CreateBreakDto,
  ) {
    return this.agendaService.addBreak(id, { createBreakDto, dayNumber })
  }

  @Put(':id/dayplan/:dayNumber/breaks/:uid')
  updateBreak(
    @Param('id', ParseToMongoId) id: string,
    @Param('dayNumber', ParseToInt) dayNumber: number,
    @Param('uid') uid: string,
    @Body() updateBreakDto: UpdateBreakDto,
  ) {
    return this.agendaService.updateBreak(id, {
      updateBreakDto,
      dayNumber,
      uid,
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaService.remove(+id)
  }

  @Delete(':id/dayplan/:dayNumber/breaks/:uid')
  removeBreak(
    @Param('id', ParseToMongoId) id: string,
    @Param('dayNumber', ParseToInt) dayNumber: number,
    @Param('uid') uid: string,
  ) {
    return this.agendaService.removeBreak(id, { dayNumber, uid })
  }
}
