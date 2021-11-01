import { prop, index, modelOptions, Ref } from '@typegoose/typegoose'
import { getProviderByTypegooseClass } from '@namand/providers'
import { BaseModel } from '@namand/models'
import { Business } from '@namand/domains/business/entities'

@index({ businessId: 1, email: 1 })
@modelOptions({ schemaOptions: { _id: true, timestamps: true } })
export class Customer extends BaseModel {
  @prop({ required: true, ref: () => Business })
  business: Ref<Business>

  @prop({ required: true, validate: /\S+/ })
  email: string

  @prop({ required: true, validate: /\S+/ })
  name: string

  @prop({ default: '', validate: /\S+/ })
  lastName: string
}

export const CustomerProvider = getProviderByTypegooseClass(Customer)
