import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'
import { StaffsService } from './staffs.service'
import { CreateStaffDto } from './dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { BusinessUser, Pagination } from '@namand/decorators'
import { PaginationQuery, RequestBusinessUser } from '@namand/interfaces'
import { PaginationInterceptor } from '@namand/interceptors'
import { ParseToMongoId } from '@namand/pipes'
import { JwtAuthGuard } from '@namand/guards'

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createStaffDto: CreateStaffDto,
    @BusinessUser() business: RequestBusinessUser,
  ) {
    return this.staffsService.create(createStaffDto, business)
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Pagination() pagination: PaginationQuery) {
    return this.staffsService.findAll(pagination)
  }

  @Get(':id')
  findOne(@Param('id', ParseToMongoId) id: string) {
    return this.staffsService.findById(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(id, updateStaffDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.staffsService.remove(+id)
    return
  }
}
