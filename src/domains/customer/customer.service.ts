import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { InjectModel } from '@namand/providers'
import { MongooseModel, PaginationQuery } from '@namand/interfaces'
import { Customer } from './entities'
import { CreateCustomerDto, UpdateCustomerDto } from './dto'

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: MongooseModel<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    if (await this.emailIsAlreadyTaken(createCustomerDto.email)) {
      throw new ConflictException('Customer email is taken')
    }
    return await this.customerModel.create(createCustomerDto)
  }

  async getOrCreateCustomerId(customer: string | CreateCustomerDto) {
    const isId =
      typeof customer === 'string' || customer instanceof Types.ObjectId

    if (isId) {
      const user = await this.findOne(customer as string)
      return user._id
    }

    const userExists = await this.customerModel
      .findOne({ email: (customer as CreateCustomerDto).email }, '_id')
      .lean()
    if (userExists) return userExists._id

    return (await this.customerModel.create(customer as CreateCustomerDto))._id
  }

  async findMany(
    { skip, limit }: PaginationQuery,
    { businessId }: { businessId?: string } = {},
  ) {
    const [total, customers] = await Promise.all([
      this.customerModel.countDocuments({
        ...(businessId && { business: businessId }),
      }),
      this.customerModel
        .find({
          ...(businessId && { business: businessId }),
        })
        .skip(skip)
        .limit(limit)
        .lean(),
    ])
    return { total, results: customers }
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id).lean()
    if (!customer) throw new NotFoundException('Customer not found')
    return customer
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .lean()

    if (!updateCustomerDto) throw new NotFoundException('Customer not found')
    return updatedCustomer
  }

  async remove(id: string) {
    return await this.customerModel.deleteOne({ _id: id })
  }

  private async emailIsAlreadyTaken(email: string) {
    return !!(await this.customerModel.findOne({ email }, 'email').lean())
  }
}
