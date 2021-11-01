import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { getRandomeHash, Hasher, toObjectId, toSlug } from '@namand/utils'
import { MongooseModel, PaginationQuery } from '@namand/interfaces'
import { InjectModel } from '@namand/providers'
import { Business } from './entities'
import {
  CreateBusinessDto,
  UpdateBusinessDto,
  UpdateBusinessPasswordDto,
} from './dto'

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business)
    private readonly businessModel: MongooseModel<Business>,
  ) {}

  async create(createBusinessDto: CreateBusinessDto) {
    if (await this.emailIsTaked(createBusinessDto.email))
      throw new ConflictException('Email already exists')

    const business = {
      ...createBusinessDto,
      slug: await this.getSafeSlug(
        createBusinessDto.name,
        createBusinessDto.slug,
      ),
      password: await Hasher.generateHash(createBusinessDto.password),
    }

    const businessStored = await this.businessModel.create(business)
    delete businessStored.password
    return businessStored
  }

  async findAll({ skip, limit }: PaginationQuery) {
    const [total, business] = await Promise.all([
      this.businessModel.countDocuments({}),
      this.businessModel.find({}).skip(skip).limit(limit).lean(),
    ])
    return { total, results: business }
  }

  async findOne(
    id: string,
    {
      includeStaffs = true,
      includeServices = true,
      includeAppointments = true,
    } = {},
  ) {
    const businessId = toObjectId(id)
    const [business] = await this.businessModel.aggregate<Business>(
      [
        { $match: { _id: businessId } },
        { $project: { password: 0 } },
        includeStaffs &&
          this.buildJoinLookup({
            from: 'staffs',
            foreign: 'business',
            as: 'staffs',
          }),
        ,
        includeServices &&
          this.buildJoinLookup({
            from: 'services',
            foreign: 'business',
            as: 'services',
          }),
        includeAppointments &&
          this.buildJoinLookup({
            from: 'appointments',
            foreign: 'business',
            as: 'appointments',
          }),
        ,
      ].filter(Boolean),
    )
    if (!business) throw new NotFoundException('Business not found')
    return business
  }

  findByEmail(email: string) {
    return this.businessModel.findOne({ email }, 'password').lean()
  }

  async update(id: string, updateBusinessDto: UpdateBusinessDto) {
    if (await this.emailIsTaked(updateBusinessDto.email))
      throw new ConflictException('Email already exists')

    return this.businessModel.findByIdAndUpdate(id, updateBusinessDto, {
      new: true,
    })
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdateBusinessPasswordDto,
  ) {
    try {
      const business = await this.businessModel.findById(id, 'password').lean()
      if (!business) throw new NotFoundException('Business not found')

      const passwordMatch = await Hasher.compareHash(
        oldPassword,
        business.password,
      )
      if (!passwordMatch) throw new ForbiddenException('Invalid password')

      const newHash = await Hasher.generateHash(newPassword)
      await this.businessModel.updateOne({ _id: id }, { password: newHash })
    } catch (error) {
      throw new ForbiddenException('Invalid password')
    }
  }

  async remove(id: string) {
    await this.businessModel.deleteOne({ _id: id })
  }

  private async emailIsTaked(email: string) {
    return !!(await this.businessModel.findOne({ email }, '_id').lean())
  }

  private async slugIsTaken(slug: string) {
    return !!(await this.businessModel.findOne({ slug }, '_id').lean())
  }

  private async getSafeSlug(name: string, slug?: string) {
    const slugBase = slug || toSlug(name)
    const safeSlug = (await this.slugIsTaken(slugBase))
      ? slug + getRandomeHash(3)
      : slugBase
    return safeSlug
  }

  private buildJoinLookup({ from, field = '_id', foreign, as }) {
    return {
      $lookup: {
        from,
        localField: field,
        foreignField: foreign,
        as,
      },
    }
  }
}
