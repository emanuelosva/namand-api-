import {
  IsAlpha,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  IsCurrency,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  validate,
  Validate,
} from 'class-validator'
import { MAX_SAFE_LENGTH } from '@namand/constants'
import { CreateCustomerDto } from '@namand/domains/customer/dto'
import { plainToClass } from 'class-transformer'
import { isValidObjectId } from 'mongoose'

@ValidatorConstraint({ name: 'CustomerIdOrObject', async: true })
export class IsCustomerIdOrCustomerObject
  implements ValidatorConstraintInterface
{
  private errors: Record<string, any>[]

  async validate(customer: CreateCustomerDto | string) {
    if (isValidObjectId(customer)) {
      return true
    }
    if (typeof customer === 'string') return false
    try {
      const customerClass = plainToClass(CreateCustomerDto, customer)
      const validationErrors = await validate(customerClass, {
        skipMissingProperties: false,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        whitelist: true,
      })
      this.errors = validationErrors
      return !validationErrors.length
    } catch (error) {
      return false
    }
  }

  defaultMessage(args: ValidationArguments) {
    if (typeof args.value === 'string') {
      return 'customer must be a valid namand id or a valid customer object'
    }

    const validationErrors = this.errors
      .map((error) => error.constraints)
      .map(Object.values)
      .flat()

    return `customer must be a valid customerObject: ${JSON.stringify(
      validationErrors,
    )}`
  }
}

export class CreateAppointmentDto {
  @IsBoolean()
  @IsOptional()
  active: boolean

  @IsMongoId({ message: 'staff must be a valid namand id' })
  staff: string

  @Validate(IsCustomerIdOrCustomerObject)
  customer: CreateCustomerDto | string

  @IsMongoId({ message: 'service must be a valid namand id' })
  service: string

  @IsDate()
  startTime: Date

  @IsDate()
  endTime: Date

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  timezone: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  cost: number

  @IsNumber()
  @IsPositive()
  @IsOptional()
  totalPaid: number

  @IsString()
  @IsCurrency()
  @Length(2, MAX_SAFE_LENGTH)
  currency: string

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  coupon: string

  @IsDate()
  @IsOptional()
  paymentDate: Date

  @IsString()
  @IsAlpha()
  @Length(1, MAX_SAFE_LENGTH)
  @IsOptional()
  cancellReason: string
}
