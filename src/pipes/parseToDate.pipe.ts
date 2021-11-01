import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'

@Injectable()
export class ParseToDate implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) return

    const date = new Date(value)

    if (isNaN(date.getTime()))
      throw new BadRequestException(
        `Value ${metadata.data} must be a valid Date or unixtime`,
      )

    return date
  }
}
