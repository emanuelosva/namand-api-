import { MAX_SAFE_LENGTH, MIN_PASSWORD_LENGHT } from '@namand/constants'
import { IsString, Length, Matches } from 'class-validator'

export class UpdateBusinessPasswordDto {
  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_SAFE_LENGTH)
  @Matches(/[a-aA-Z0-9]/)
  newPassword: string

  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_SAFE_LENGTH)
  @Matches(/[a-aA-Z0-9]/)
  oldPassword: string
}
