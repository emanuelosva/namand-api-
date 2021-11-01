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
import { PaginationQuery } from '@namand/interfaces'
import { ParseToMongoId } from '@namand/pipes'
import { Pagination } from '@namand/decorators'
import { CustomerService } from './customer.service'
import { CreateCustomerDto, UpdateCustomerDto } from './dto'

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto)
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAll(
    @Pagination() pagination: PaginationQuery,
    @Query('businessId', ParseToMongoId) businessId: string,
  ) {
    return this.customerService.findMany(pagination, { businessId })
  }

  @Get(':id')
  findOne(@Param('id', ParseToMongoId) id: string) {
    return this.customerService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseToMongoId) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseToMongoId) id: string) {
    await this.customerService.remove(id)
    return
  }
}
