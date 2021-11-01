import {
  IsAlpha,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator'
import { MAX_SAFE_LENGTH } from '@namand/constants'

export class UpdateCustomerDto {
  @IsEmail()
  @MaxLength(MAX_SAFE_LENGTH)
  @IsOptional()
  email: string

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  name: string

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  lastName: string
}
