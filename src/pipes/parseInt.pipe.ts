import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'

@Injectable()
export class ParseToInt implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const numberValue = parseInt(value, 10)

    if (isNaN(numberValue)) {
      throw new BadRequestException(
        `Value ${metadata.data} must be a valid number`,
      )
    }

    return numberValue
  }
}
