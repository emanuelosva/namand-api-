import { IsDate, IsMongoId } from 'class-validator'
import { Types } from 'mongoose'

export class CreateTimeOffDto {
  @IsMongoId()
  staff: Types.ObjectId

  @IsDate()
  startTime: Date

  @IsDate()
  endTime: Date
}
