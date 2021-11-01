import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { Pagination } from '@namand/decorators'
import { PaginationQuery } from '@namand/interfaces'
import { ParseToMongoId } from '@namand/pipes'
import { PaginationInterceptor } from '@namand/interceptors'
import { ServicesService } from './services.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto)
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findMany(
    @Pagination() pagination: PaginationQuery,
    @Query('businessId', ParseToMongoId) businessId: string,
  ) {
    return this.servicesService.findMany(pagination, businessId)
  }

  @Get(':id')
  findOne(@Param('id', ParseToMongoId) id: string) {
    return this.servicesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseToMongoId) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseToMongoId) id: string) {
    await this.servicesService.remove(id)
    return
  }
}
