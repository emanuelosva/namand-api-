import { IsString, IsOptional, IsEmail, Length, Matches } from 'class-validator'

export class UpdateBusinessDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @Length(2, 50)
  @Matches(/[a-zA-A0-9]/)
  @IsOptional()
  @IsOptional()
  slug: string

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @Length(2, 6)
  @IsOptional()
  countryCode: string

  @IsString()
  @IsOptional()
  currency: string
}
