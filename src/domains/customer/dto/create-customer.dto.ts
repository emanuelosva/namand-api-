import {
  IsAlpha,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator'
import { MAX_SAFE_LENGTH } from '@namand/constants'

export class CreateCustomerDto {
  @IsMongoId({ message: 'business must be a valid namand id' })
  business: string

  @IsEmail()
  @MaxLength(MAX_SAFE_LENGTH)
  email: string

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  name: string

  @IsString()
  @IsAlpha()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  lastName: string
}
