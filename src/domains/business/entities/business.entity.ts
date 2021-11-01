/**
 * Business
 * @description Business schema defintion.
 */

import { prop, modelOptions, index } from '@typegoose/typegoose'
import { BaseModel } from '@namand/models'
import { getProviderByTypegooseClass } from '@namand/providers'
import { DEFAULT_CURRENCY, DEFAULT_TIMEZONE } from '@namand/constants'

@index({ email: 1, slug: 1 })
@modelOptions({
  schemaOptions: { _id: true, timestamps: true, collection: 'business' },
})
export class Business extends BaseModel {
  @prop({ required: true, trim: true })
  email: string

  @prop({ required: true, trim: true, validate: /\S+/ })
  name: string

  @prop({ required: true, trim: true, validate: /\S+/ })
  slug: string

  @prop({ default: DEFAULT_CURRENCY, trim: true, validate: /\S+/ })
  currency: string

  @prop({ default: DEFAULT_TIMEZONE, trim: true, validate: /\S+/ })
  timezone: string

  @prop({ required: true, trim: true, select: false })
  password: string
}

export const BusinessProvider = getProviderByTypegooseClass(Business)
