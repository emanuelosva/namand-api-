import { IsString, IsEmail, Length, Matches } from 'class-validator'
import { MIN_PASSWORD_LENGHT, MAX_SAFE_LENGTH } from '@namand/constants'

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_SAFE_LENGTH)
  @Matches(/[a-aA-Z0-9]/)
  password: string
}
