import { Provider, Inject } from '@nestjs/common'
import { mongoose } from '@typegoose/typegoose'
import { getModelForClass } from '@typegoose/typegoose'
import { DB_CONNECTION_KEY, DB_MODEL_KEY_SUFFIX } from '@namand/constants'

export interface TypegooseClass {
  new (...args: any[])
}

export function getModelToken(modelName: string): string {
  return modelName + DB_MODEL_KEY_SUFFIX
}

export function getProviderByTypegooseClass(
  typegooseClass: TypegooseClass,
): Provider {
  return {
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: mongoose.Connection) =>
      getModelForClass(typegooseClass, { existingConnection: connection }),
    inject: [DB_CONNECTION_KEY],
  }
}

export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name))
}
