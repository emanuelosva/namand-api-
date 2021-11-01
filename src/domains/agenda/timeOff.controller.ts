import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { PaginationInterceptor } from '@namand/interceptors'
import { Pagination } from '@namand/decorators'
import { ParseToMongoId } from '@namand/pipes'
import { PaginationQuery } from '@namand/interfaces'
import { TimeOffService } from './timeOff.service'
import { CreateTimeOffDto, UpdateTimeOffDto } from './dto'

@Controller('time-offs')
export class TimeOffController {
  constructor(private readonly timeOffService: TimeOffService) {}

  @Post()
  create(@Body() createTimeOffDto: CreateTimeOffDto) {
    return this.timeOffService.create(createTimeOffDto)
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAllOfStaff(
    @Pagination() pagination: PaginationQuery,
    @Query('staffId', ParseToMongoId) staffId: string,
  ) {
    return this.timeOffService.findMany(pagination, staffId)
  }

  @Get(':id')
  findOne(@Param('id', ParseToMongoId) id: string) {
    return this.timeOffService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseToMongoId) id: string,
    @Body() updateAgendaDto: UpdateTimeOffDto,
  ) {
    return this.timeOffService.update(id, updateAgendaDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseToMongoId) id: string) {
    await this.timeOffService.remove(id)
    return
  }
}
