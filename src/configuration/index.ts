import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { env } from './getEnv.config'
import { loadPrefix } from './loadPrefix.config'

const prefix = loadPrefix()
const environment = process.env.NODE_ENV

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

export const APP = {
  name: 'Namand',
  port: env.number(`${prefix}PORT`, 3000),
  isDevMode: Object.is(environment, 'development'),
  isProdMode: Object.is(environment, 'production'),
  isTestMode: Object.is(environment, 'test'),
  environment,
  paginationLimit: 50,
}

export const MONGO_DB = {
  uri: env.string(`${prefix}MONGO_URI`, ''),
}

export const AUTH = {
  expiresIn: env.number(`${prefix}AUTH_EXPIRES_IN`, 7200),
  jwtTokenSecret: env.string(`${prefix}AUTH_SECRET`, 'namand-secret'),
  algorithm: 'HS256' as const,
  defaultPassword: env.string(`${prefix}DEFAULT_PASSWORD`, 'namand-secret'),
}
