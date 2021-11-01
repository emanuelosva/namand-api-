import { prop, modelOptions, index, Ref } from '@typegoose/typegoose'
import { BaseModel } from '@namand/models'
import { getProviderByTypegooseClass } from '@namand/providers'
import { Staff } from '@namand/domains/staffs/entities'

@index({ staffId: 1 })
@modelOptions({ schemaOptions: { _id: true, timestamps: true } })
export class TimeOff extends BaseModel {
  @prop({ required: true, ref: () => Staff })
  staff: Ref<Staff>

  @prop({ required: true })
  startTime: Date

  @prop({ required: true })
  endTime: Date
}

export const TimeOffProvider = getProviderByTypegooseClass(TimeOff)
