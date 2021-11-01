import { IsDate, IsOptional } from 'class-validator'

export class UpdateTimeOffDto {
  @IsDate()
  @IsOptional()
  startTime: Date

  @IsDate()
  @IsOptional()
  endTime: Date
}
