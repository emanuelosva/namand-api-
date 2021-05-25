export const env = {
  number: getEnvNumber,
  string: getEnvString,
  boolean: getEnvBoolean,
  array: getEnvArray,
}

function getEnv<T>(varname: string, byDefault?: T): T {
  const value = process.env[varname] ?? byDefault

  if ([undefined, null].includes(value)) {
    throw new Error(`${varname} is not defined`)
  }

  return value as T
}

function getEnvNumber(varname: string, byDefault?: number): number {
  const value = getEnv<number>(varname, byDefault)
  if (isNaN(value)) {
    throw new TypeError(`${varname} with value: ${value} is an invalid number`)
  }
  return +value
}

function getEnvString(varname: string, byDefault?: string): string {
  return getEnv<string>(varname, byDefault)
}

function getEnvBoolean(varname: string, byDefault?: boolean): boolean {
  const value = getEnv<boolean>(varname, byDefault)

  const trueValues = [true, 'true', 'True', '1', 1, 'yes', 'y', 'allows']
  if (trueValues.includes(value)) return true
  return false
}

type allowedEnvTypes = 'string' | 'number' | 'boolean'

function getEnvArray<T>(
  varname: string,
  type: allowedEnvTypes,
  byDefault: T[],
): Array<T> {
  const value = getEnvString(varname, 'default')

  if (value === 'default' && byDefault) return byDefault
  if (value !== 'default' && !byDefault) {
    throw new Error(`${varname} is not defined`)
  }
  if (!value.includes(',')) {
    throw new TypeError(`${value} invalid to parse to array`)
  }

  const array = value.split(',').map((str) => str.trim())
  const valueParser =
    type === 'string' ? String : type === 'number' ? Number : Boolean

  return array.map(valueParser as any) as any as T[]
}
