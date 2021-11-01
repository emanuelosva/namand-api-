import { prop, index, Ref, modelOptions } from '@typegoose/typegoose'
import { BaseModel } from '@namand/models'
import { Business } from '@namand/domains/business/entities'
import { getProviderByTypegooseClass } from '@namand/providers'

@index({ business: 1, name: 1 })
@modelOptions({ schemaOptions: { _id: true, timestamps: true } })
export class Service extends BaseModel {
  @prop({ required: true, ref: () => Business })
  business: Ref<Business>

  @prop({ required: true, validate: /\S+/ })
  name: string

  @prop({ required: true })
  duration: number

  @prop({ required: true })
  localPrice: number

  @prop({ default: 0 })
  usdPrice: number
}

export const ServiceProvider = getProviderByTypegooseClass(Service)
