import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import {
  MAX_BREAKS_PER_DAY,
  MAX_SAFE_LENGTH,
  STRING_HOUR_FORMAT,
} from '@namand/constants'
import { Type } from 'class-transformer'
import { Types } from 'mongoose'

export class BreakDto {
  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'startTime must match the 24 hours time format HH:mm',
  })
  startTime: string

  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'startTime must match the 24 hours time format HH:mm',
  })
  endTime: string
}

export class DayPlanDto {
  @IsString()
  @Length(1, MAX_SAFE_LENGTH)
  dayName: string

  @IsNumber()
  @Min(0)
  @Max(6)
  dayNumber: number

  @IsBoolean()
  @IsOptional()
  active: boolean

  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'startTime must match the 24 hours time format HH:mm',
  })
  startTime: string

  @IsString()
  @Matches(STRING_HOUR_FORMAT, {
    message: 'endTime must match the 24 hours time format HH:mm',
  })
  endTime: string

  @IsArray()
  @ArrayMaxSize(MAX_BREAKS_PER_DAY)
  @ValidateNested({ each: true })
  @Type(() => BreakDto)
  breaks: BreakDto[]
}

export class CreateAgendaDto {
  @IsMongoId({ message: 'staff must be a valid namand id' })
  staff: Types.ObjectId

  @IsString()
  @Length(1, MAX_SAFE_LENGTH)
  timezone: string

  @IsNumber()
  @IsPositive()
  slotSize: number

  @IsNumber()
  @IsPositive()
  timeForBooking: number

  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @ValidateNested({ each: true })
  @Type(() => DayPlanDto)
  workingPlan: DayPlanDto[]
}
