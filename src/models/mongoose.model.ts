import { prop, modelOptions } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'

@modelOptions({ schemaOptions: { timestamps: true, _id: true } })
export abstract class BaseModel {
  @prop({ index: true, default: nanoid })
  uid?: string

  @prop({ default: () => new Date() })
  createdAt?: Date

  @prop({ default: () => new Date() })
  updatedAt?: Date
}
