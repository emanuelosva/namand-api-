import { ModelType } from '@typegoose/typegoose/lib/types'

export type MongooseModel<T> = ModelType<T>

export type PaginationQuery = {
  skip: number
  limit: number | undefined
}
