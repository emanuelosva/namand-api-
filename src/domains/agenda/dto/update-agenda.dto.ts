import { MAX_SAFE_LENGTH, STRING_HOUR_FORMAT } from '@namand/constants'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator'

export class UpdateAgendaDto {
  @IsString()
  @Length(1, MAX_SAFE_LENGTH)
  @IsOptional()
  timezone: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  slotSize: number

  @IsNumber()
  @IsPositive()
  @IsOptional()
  timeForBooking: number
}

export class UpdateDayPlanDto {
  @IsBoolean()
  @IsOptional()
  active: boolean

  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'startTime must match the 24 hours time format HH:mm',
  })
  @IsOptional()
  startTime: string

  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'endTime must match the 24 hours time format HH:mm',
  })
  @IsOptional()
  endTime: string
}

export class UpdateBreakDto {
  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'startTime must match the 24 hours time format HH:mm',
  })
  @IsOptional()
  startTime: string

  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'startTime must match the 24 hours time format HH:mm',
  })
  @IsOptional()
  endTime: string
}
