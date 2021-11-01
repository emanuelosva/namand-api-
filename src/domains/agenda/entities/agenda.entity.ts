import { prop, modelOptions, index, Ref } from '@typegoose/typegoose'
import { BaseModel } from '@namand/models'
import { getProviderByTypegooseClass } from '@namand/providers'
import {
  DEFAULT_TIME_FOR_BOOKING,
  SLOT_SIZE,
  STRING_HOUR_FORMAT,
} from '@namand/constants'
import { Staff } from '@namand/domains/staffs/entities'

@modelOptions({ schemaOptions: { _id: false, timestamps: true } })
export class Break extends BaseModel {
  @prop({ required: true, validate: STRING_HOUR_FORMAT })
  startTime: string

  @prop({ required: true, validate: STRING_HOUR_FORMAT })
  endTime: string
}

@modelOptions({ schemaOptions: { _id: false, timestamps: true } })
export class DayPlan extends BaseModel {
  @prop({ required: true, validate: /\S+/ })
  dayName: string

  @prop({ required: true, min: 0, max: 6 })
  dayNumber: number

  @prop({ default: false })
  active: boolean

  @prop({ required: true, validate: STRING_HOUR_FORMAT })
  startTime: string

  @prop({ required: true, validate: STRING_HOUR_FORMAT })
  endTime: string

  @prop({ type: () => [Break] })
  breaks: Break[]
}

@index({ staffId: 1 })
@modelOptions({ schemaOptions: { _id: true, timestamps: true } })
export class Agenda extends BaseModel {
  @prop({ required: true, ref: () => Staff })
  staff: Ref<Staff>

  @prop({ required: true, validate: /\S+/ })
  timezone: string

  @prop({ default: SLOT_SIZE })
  slotSize: number

  @prop({ default: DEFAULT_TIME_FOR_BOOKING })
  timeForBooking: number

  @prop({ type: () => [DayPlan] })
  workingPlan: DayPlan[]
}

export const AgendaProvider = getProviderByTypegooseClass(Agenda)
