import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { PaginationInterceptor } from '@namand/interceptors'
import { PaginationQuery } from '@namand/interfaces'
import { Pagination } from '@namand/decorators'
import { ParseToMongoId, ParseToDate, ParseToBool } from '@namand/pipes'
import { AppointmentsService } from './appointments.service'
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto)
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAll(
    @Pagination() pagination: PaginationQuery,
    @Query('staff') staff?: string,
    @Query('customer') customer?: string,
    @Query('service') service?: string,
    @Query('coupon') coupon?: string,
    @Query('startTime', ParseToDate) startTime?: Date,
    @Query('endTime', ParseToDate) endTime?: Date,
    @Query('active', ParseToBool) active?: boolean,
  ) {
    return this.appointmentsService.findMany({
      ...pagination,
      staff,
      customer,
      service,
      coupon,
      startTime,
      endTime,
      active,
    })
  }

  @Get(':id')
  findOne(@Param('id', ParseToMongoId) id: string) {
    return this.appointmentsService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto)
  }

  @Put(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id)
  }
}
