import { IsString, MaxLength } from 'class-validator'
import { MAX_SAFE_LENGTH } from '@namand/constants'

export class RefreskTokenDto {
  @IsString()
  @MaxLength(MAX_SAFE_LENGTH)
  token: string
}
