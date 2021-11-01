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
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { BusinessService } from './business.service'
import { PaginationInterceptor } from '@namand/interceptors'
import {
  CreateBusinessDto,
  UpdateBusinessDto,
  UpdateBusinessPasswordDto,
} from './dto'
import { Pagination } from '@namand/decorators'
import { PaginationQuery } from '@namand/interfaces'
import { ParseToBool, ParseToMongoId } from '@namand/pipes'
import { JwtAuthGuard } from '@namand/guards'

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationInterceptor)
  findAll(@Pagination() pagination: PaginationQuery) {
    return this.businessService.findAll(pagination)
  }

  @Get('/:id')
  findOne(
    @Param('id', ParseToMongoId) id: string,
    @Query('includeStaffs', ParseToBool) includeStaffs: boolean,
    @Query('includeServices', ParseToBool) includeServices: boolean,
    @Query('includeAppointments', ParseToBool) includeAppointments: boolean,
  ) {
    return this.businessService.findOne(id, {
      includeStaffs,
      includeAppointments,
      includeServices,
    })
  }

  @Put('/:id')
  update(
    @Param('id', ParseToMongoId) id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(id, updateBusinessDto)
  }

  @Put('/:id/password')
  updatePassword(
    @Param('id', ParseToMongoId) id: string,
    @Body() updatePasswordDto: UpdateBusinessPasswordDto,
  ) {
    return this.businessService.updatePassword(id, updatePasswordDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseToMongoId) id: string) {
    await this.businessService.remove(id)
    return
  }
}
