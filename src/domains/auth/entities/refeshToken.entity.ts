/**
 * Business
 * @description Business schema defintion.
 */

import { prop, modelOptions, index, Ref } from '@typegoose/typegoose'
import { BaseModel } from '@namand/models'
import { getProviderByTypegooseClass } from '@namand/providers'
import { getRandomeHash } from '@namand/utils'
import { Business } from '@namand/domains/business/entities'

@index({ token: 1, bussines: 1 })
@modelOptions({
  schemaOptions: { _id: true, timestamps: true, collection: 'refresh_tokens' },
})
export class RefeshToken extends BaseModel {
  @prop({ default: () => getRandomeHash() })
  token?: string

  @prop({ required: true, type: () => Business })
  business: Ref<Business>
}

export const RefeshTokenProvider = getProviderByTypegooseClass(RefeshToken)
