import { Business } from '@namand/domains/business/entities'
import { Types } from 'mongoose'

export type RequestBusinessUser = Pick<
  Business & { _id: Types.ObjectId },
  '_id' | 'email' | 'name' | 'slug' | 'currency' | 'timezone' | 'createdAt'
>
