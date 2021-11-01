import {
  IsAlpha,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import {
  MAX_SAFE_LENGTH,
  MAX_SERVICE_DURATION_IN_MIN,
  MIN_SERVICE_DURATION_IN_MIN,
} from '@namand/constants'

export class CreateServiceDto {
  @IsMongoId({ message: 'business must be a valid namand id' })
  business: string

  @IsString()
  @IsAlpha()
  @Length(1, MAX_SAFE_LENGTH)
  name: string

  @IsNumber()
  @Length(MIN_SERVICE_DURATION_IN_MIN, MAX_SERVICE_DURATION_IN_MIN)
  duration: number

  @IsNumber()
  localPrice: number

  @IsNumber()
  @IsOptional()
  usdPrice: number
}
