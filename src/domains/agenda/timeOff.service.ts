import { Injectable } from '@nestjs/common'
import { InjectModel } from '@namand/providers'
import { MongooseModel, PaginationQuery } from '@namand/interfaces'
import { CreateTimeOffDto, UpdateTimeOffDto } from './dto'
import { TimeOff } from './entities'

@Injectable()
export class TimeOffService {
  constructor(
    @InjectModel(TimeOff)
    private readonly timeOffModel: MongooseModel<TimeOff>,
  ) {}

  create(createTimeOffDto: CreateTimeOffDto) {
    return this.timeOffModel.create(createTimeOffDto)
  }

  findMany({ skip, limit }: PaginationQuery, staffId?: string) {
    return staffId
      ? this.findManyOfStaff({ skip, limit }, staffId)
      : this.findAll({ skip, limit })
  }

  async findAll({ skip, limit }: PaginationQuery) {
    const [total, timeOffs] = await Promise.all([
      this.timeOffModel.countDocuments({}),
      this.timeOffModel.find({}).skip(skip).limit(limit).lean(),
    ])
    return { total, results: timeOffs }
  }

  async findManyOfStaff({ skip, limit }: PaginationQuery, staff?: string) {
    const [total, timeOffs] = await Promise.all([
      this.timeOffModel.countDocuments({ staff }),
      this.timeOffModel.find({ staff }).skip(skip).limit(limit).lean(),
    ])
    return { total, results: timeOffs }
  }

  findOne(id: string) {
    return this.timeOffModel.findById(id).lean()
  }

  update(id: string, updateTimeOffDto: UpdateTimeOffDto) {
    return this.timeOffModel
      .findByIdAndUpdate(id, updateTimeOffDto, { new: true })
      .lean()
  }

  async remove(id: string) {
    await this.timeOffModel.deleteOne({ _id: id })
  }
}
