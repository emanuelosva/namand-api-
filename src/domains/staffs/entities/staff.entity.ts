/**
 * Staff
 * @description Staff schema defintion.
 */

import { prop, modelOptions, index, Ref } from '@typegoose/typegoose'
import { getProviderByTypegooseClass } from '@namand/providers'
import { Business } from '@namand/domains/business/entities'
import { BaseModel } from '@namand/models'

@index({ email: 1 })
@modelOptions({ schemaOptions: { _id: true, timestamps: true } })
export class Staff extends BaseModel {
  @prop({ required: true, trim: true, validate: /\S+/ })
  name: string

  @prop({ required: true, trim: true, validate: /\S+/ })
  lastName: string

  @prop({ required: true, trim: true })
  email: string

  @prop({ default: '', trim: true })
  phone?: string

  @prop({ default: '', trim: true })
  countryCode?: string

  @prop({ required: true, trim: true })
  password: string

  @prop({ required: true, ref: () => Business })
  business: Ref<Business>
}

export const StaffProvider = getProviderByTypegooseClass(Staff)
