/**
 * CreateStaffDto
 * @description DTO for create a new Staff
 */

import {
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  IsAlphanumeric,
  IsOptional,
  IsMongoId,
} from 'class-validator'
import { MAX_SAFE_LENGTH } from '@namand/constants'
export class CreateStaffDto {
  @IsString()
  @Length(2, MAX_SAFE_LENGTH)
  name: string

  @IsString()
  @Length(2, MAX_SAFE_LENGTH)
  lastName: string

  @IsEmail()
  @Length(2, MAX_SAFE_LENGTH)
  email: string

  @IsPhoneNumber()
  @IsOptional()
  phone?: string

  @IsString()
  @Length(2, 6)
  @IsOptional()
  countryCode?: string

  @IsString()
  @IsAlphanumeric()
  @Length(6, MAX_SAFE_LENGTH)
  password: string

  @IsString()
  @IsMongoId({ message: 'business must be a valid namand id' })
  business: string
}
