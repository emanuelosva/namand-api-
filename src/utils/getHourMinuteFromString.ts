import { STRING_HOUR_FORMAT } from '@namand/constants'

export const getHourMinFromString = (stringTime: string) => {
  const cleanStringTime = stringTime.replace(/(am|pm)/, '').replace(/\s/, '')
  if (!STRING_HOUR_FORMAT.test(cleanStringTime)) {
    throw new Error(
      `Error on getHourMinFromString - Invalid string time: ${stringTime}`,
    )
  }
  return stringTime.split(':').map(Number)
}
