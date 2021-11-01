import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

type FunctionTypes =
  | string
  | number
  | boolean
  | Array<any>
  | Record<string, any>

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!value || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)

    if (errors.length) {
      const errorMessage = errors.reduce(
        (list, error) => list.concat(Object.values(error.constraints)),
        [],
      )
      throw new BadRequestException(errorMessage)
    }
    return value
  }

  private toValidate(metatype: FunctionTypes): boolean {
    const types: FunctionTypes[] = [String, Number, Boolean, Array, Object]
    return !types.includes(metatype)
  }
}
