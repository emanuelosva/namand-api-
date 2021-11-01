import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class ParseToBool implements PipeTransform {
  transform(value: string) {
    if (!value) return
    const trueValues = [true, 'true', 'True', 'yes', 'ok', 'enabled']
    return trueValues.includes(value)
  }
}
