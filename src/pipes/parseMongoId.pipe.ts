import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { mongoose } from '@typegoose/typegoose'

@Injectable()
export class ParseToMongoId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) return
    try {
      const mongoId = mongoose.Types.ObjectId(value)
      return mongoId
    } catch (error) {
      throw new BadRequestException(
        `Value ${metadata.data} must be a valid namand id`,
      )
    }
  }
}
