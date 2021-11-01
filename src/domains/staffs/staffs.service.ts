import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@namand/providers'
import {
  MongooseModel,
  PaginationQuery,
  RequestBusinessUser,
} from '@namand/interfaces'
import { AgendaService } from '@namand/domains/agenda'
import { Hasher } from '@namand/utils'
import { Staff } from './entities'
import { CreateStaffDto, UpdateStaffDto } from './dto'

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Staff) private readonly staffModel: MongooseModel<Staff>,
    private readonly agendaService: AgendaService,
  ) {}

  async create(createStaffDto: CreateStaffDto, business: RequestBusinessUser) {
    const isEmailTaken = await this.staffModel
      .findOne({ email: createStaffDto.email })
      .lean()

    if (isEmailTaken) throw new ConflictException('Email already exists')

    const staff = {
      ...createStaffDto,
      password: await Hasher.generateHash(createStaffDto.password),
    }
    const createdStaff = await this.staffModel.create(staff)
    delete createdStaff.password

    /** @TODO use dinamic timezone */
    await this.agendaService.create(
      this.agendaService.buildDefaultAgenda(
        createdStaff._id,
        business.timezone,
      ),
    )

    return createdStaff
  }

  async findAll({ skip, limit }: PaginationQuery) {
    const [total, staffs] = await Promise.all([
      this.staffModel.countDocuments({}),
      this.staffModel.find({}, '-password').skip(skip).limit(limit).lean(),
    ])
    return { total, results: staffs }
  }

  async findById(id: string) {
    const staff = await this.staffModel.findById(id).lean()
    if (!staff) throw new NotFoundException('Staff not found')
    return staff
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const updatedStaff = await this.staffModel
      .findByIdAndUpdate(id, updateStaffDto, { new: true })
      .lean()
    if (!updatedStaff) throw new NotFoundException('Staff not found')
    return updatedStaff
  }

  async remove(id: number) {
    return await this.staffModel.deleteOne({ _id: id })
  }
}
