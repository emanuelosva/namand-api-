import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common'
import { addMonths } from 'date-fns'
import { InjectModel } from '@namand/providers'
import { MongooseModel, PaginationQuery } from '@namand/interfaces'
import { StaffsService } from '@namand/domains/staffs'
import { CustomerService } from '@namand/domains/customer'
import { ServicesService } from '@namand/domains/services'
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto'
import { Appointment } from './entities'

type AppointmentQuery = {
  staff?: string
  customer?: string
  service?: string
  startTime?: Date
  endTime?: Date
  coupon?: string
  active?: boolean
}

type AppointmentQueryWithPagination = PaginationQuery & AppointmentQuery

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: MongooseModel<Appointment>,
    private readonly staffService: StaffsService,
    private readonly customerService: CustomerService,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Validate entities already exists
    await this.staffService.findById(createAppointmentDto.staff)
    await this.servicesService.findOne(createAppointmentDto.service)

    const timeIsFree = await this.appointmentHourIsAvailable({
      ...createAppointmentDto,
    })
    if (!timeIsFree)
      throw new PreconditionFailedException('The sent time is unavailable')

    const customerId = await this.customerService.getOrCreateCustomerId(
      createAppointmentDto.customer,
    )
    return this.appointmentModel.create({
      ...createAppointmentDto,
      customer: customerId,
    })
  }

  async findMany({
    staff,
    customer,
    startTime,
    endTime,
    service,
    coupon,
    active,
    skip = 0,
    limit = undefined,
  }: AppointmentQueryWithPagination) {
    const hasActiveStatus = [true, false].includes(active)
    const query = {
      ...(staff && { staff }),
      ...(customer && { customer }),
      ...(service && { service }),
      ...(coupon && { coupon }),
      ...(hasActiveStatus && { active }),
      startTime: {
        $gte: startTime || new Date(),
        $lt: endTime || addMonths(new Date(), 3),
      },
    }
    const [total, appointments] = await Promise.all([
      this.appointmentModel.countDocuments(query),
      this.appointmentModel.find(query).skip(skip).limit(limit).lean(),
    ])
    return { total, results: appointments }
  }

  async findOne(id: string) {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('staff')
      .populate('customer')
      .populate('service')
      .lean()

    if (!appointment) throw new NotFoundException('Appointment not found')
    return appointment
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    delete updateAppointmentDto.active
    const appointment = await this.appointmentModel.findById(id).lean()
    if (!appointment) throw new NotFoundException('Appointment not found')

    if (updateAppointmentDto.startTime && updateAppointmentDto.endTime) {
      const timeIsFree = await this.appointmentHourIsAvailable({
        staff: appointment.staff as any as string,
        appointmentId: appointment._id,
        isUpdate: true,
        ...updateAppointmentDto,
      })
      if (!timeIsFree)
        throw new PreconditionFailedException('The sent time is unavailable')
    }

    return this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto)
      .populate('staff')
      .populate('customer')
      .populate('service')
      .lean()
  }

  async cancel(id: string) {
    const appointment = await this.appointmentModel
      .findByIdAndUpdate(id, { active: false })
      .populate('staff')
      .populate('customer')
      .populate('service')
      .lean()

    if (!appointment) throw new NotFoundException('Appointmnet not found')
    return appointment
  }

  async appointmentHourIsAvailable({
    staff,
    startTime,
    endTime,
    appointmentId,
    isUpdate = false,
  }: {
    staff: string
    startTime: Date
    endTime: Date
    appointmentId?: string
    isUpdate?: boolean
  }) {
    const [start, end] = [new Date(startTime), new Date(endTime)]
    /** @TODO add check avaulability */
    return !(await this.appointmentModel.findOne({
      staff,
      active: true,
      $or: [
        { startTime: start },
        { $and: [{ startTime: { $lte: start } }, { endTime: { $gt: start } }] },
        { $and: [{ startTime: { $lt: end } }, { endTime: { $gte: end } }] },
      ],
      ...(isUpdate && { _id: { $ne: appointmentId } }),
    }))
  }
}
