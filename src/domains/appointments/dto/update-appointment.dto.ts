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
} from 'class-validator'
import { Types } from 'mongoose'
import { MAX_SAFE_LENGTH } from '@namand/constants'

export class UpdateAppointmentDto {
  @IsBoolean()
  @IsOptional()
  active: boolean

  @IsMongoId({ message: 'service must be a valid namand id' })
  service: Types.ObjectId

  @IsDate()
  @IsOptional()
  startTime: Date

  @IsDate()
  @IsOptional()
  endTime: Date

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  timezone: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @IsOptional()
  cost: number

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @IsOptional()
  totalPaid: number

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  currency: string

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  @IsOptional()
  coupon: string

  @IsDate()
  @IsOptional()
  @IsOptional()
  paymentDate: Date

  @IsString()
  @IsAlpha()
  @Length(1, MAX_SAFE_LENGTH)
  @IsOptional()
  cancellReason: string
}
