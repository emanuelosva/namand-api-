/**
 * UpdateStaffDto
 * @description DTO for update a new Staff
 */

import {
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator'
import { MAX_SAFE_LENGTH } from '@namand/constants'
export class UpdateStaffDto {
  @IsString()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  name?: string

  @IsString()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  lastName?: string

  @IsEmail()
  @Length(2, MAX_SAFE_LENGTH)
  @IsOptional()
  email?: string

  @IsPhoneNumber()
  @IsOptional()
  phone?: string

  @IsString()
  @Length(2, 6)
  @IsOptional()
  @IsOptional()
  countryCode?: string
}
