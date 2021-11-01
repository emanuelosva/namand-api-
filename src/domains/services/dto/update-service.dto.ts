import {
  IsAlpha,
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

export class UpdateServiceDto {
  @IsString()
  @IsAlpha()
  @Length(1, MAX_SAFE_LENGTH)
  @IsOptional()
  name: string

  @IsNumber()
  @Length(MIN_SERVICE_DURATION_IN_MIN, MAX_SERVICE_DURATION_IN_MIN)
  @IsOptional()
  duration: number

  @IsNumber()
  @IsOptional()
  localPrice: number

  @IsNumber()
  @IsOptional()
  @IsOptional()
  usdPrice: number
}
