import { MAX_SAFE_LENGTH, MIN_PASSWORD_LENGHT } from '@namand/constants'
import { IsString, IsOptional, IsEmail, Length, Matches } from 'class-validator'

export class CreateBusinessDto {
  @IsString()
  name: string

  @IsString()
  @Length(2, 50)
  @Matches(/[a-zA-A0-9]/)
  @IsOptional()
  slug: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_SAFE_LENGTH)
  @Matches(/[a-aA-Z0-9]/)
  password: string

  @IsString()
  @Length(2, 6)
  countryCode: string

  @IsString()
  @IsOptional()
  currency: string

  @IsString()
  @IsOptional()
  timezone: string
}
