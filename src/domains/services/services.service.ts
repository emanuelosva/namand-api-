import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@namand/providers'
import { MongooseModel, PaginationQuery } from '@namand/interfaces'
import { CreateServiceDto, UpdateServiceDto } from './dto'
import { Service } from './entities'

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service)
    private readonly serviceModel: MongooseModel<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    if (
      !(await this.serviceNameExistsInBusiness(
        createServiceDto.name,
        createServiceDto.business,
      ))
    ) {
      throw new ConflictException('Service name is already taken')
    }
    return this.serviceModel.create(createServiceDto)
  }

  async findMany({ skip, limit }: PaginationQuery, businessId: string) {
    const [total, services] = await Promise.all([
      this.serviceModel.countDocuments({
        ...(businessId && { business: businessId }),
      }),
      this.serviceModel
        .find({
          ...(businessId && { business: businessId }),
        })
        .skip(skip)
        .limit(limit)
        .lean(),
    ])
    return { total, results: services }
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findById(id).lean()
    if (!service) throw new NotFoundException('Service not found')
    return service
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const serviceUpdated = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .lean()
    if (!serviceUpdated) throw new NotFoundException('Service not found')
    return serviceUpdated
  }

  remove(id: string) {
    return this.serviceModel.deleteOne({ _id: id })
  }

  private async serviceNameExistsInBusiness(name: string, business: string) {
    return !!(await this.serviceModel
      .findOne({ name, business }, 'name')
      .lean())
  }
}
