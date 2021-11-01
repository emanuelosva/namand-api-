import { prop, modelOptions, index, Ref } from '@typegoose/typegoose'
import { getProviderByTypegooseClass } from '@namand/providers'
import { BaseModel } from '@namand/models'
import { Staff } from '@namand/domains/staffs/entities'
import { Customer } from '@namand/domains/customer/entities'
import { Service } from '@namand/domains/services/entities'

@index({ customerId: 1, startTime: 1 })
@index({ businessId: 1, startTime: 1 })
@modelOptions({ schemaOptions: { _id: true, timestamps: true } })
export class Appointment extends BaseModel {
  @prop({ default: false, type: Boolean })
  active: boolean

  @prop({ required: true, ref: () => Staff })
  staff: Ref<Staff>

  @prop({ required: true, ref: () => Customer })
  customer: Ref<Customer>

  @prop({ required: true, ref: () => Service })
  service: Ref<Service>

  @prop({ required: true, type: Date })
  startTime: Date

  @prop({ required: true, type: Date })
  endTime: Date

  @prop({ required: true, validate: /\S+/ })
  timezone: string

  @prop({ required: true, type: Number })
  cost: number

  @prop({ default: 0, type: Number })
  totalPaid: number

  @prop({ required: true, validate: /\S+/ })
  currency: string

  @prop({ required: true, validate: /\S+/ })
  coupon: string

  @prop({ type: Date, default: null })
  paymentDate: Date

  @prop({ default: '', validate: /\S+/ })
  cancellReason: string
}

export const AppointmentProvider = getProviderByTypegooseClass(Appointment)
