import dotenv from 'dotenv'
import { resolve } from 'path'
import { env } from './getEnv.config'
import { loadPrefix } from './loadPrefix.config'

const prefix = loadPrefix()

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

export const APP = {
  port: env.number(`${prefix}PORT`, 3000),
}

export const MONGO_DB = {
  uri: env.string(`${prefix}MONGO_URI`, ''),
}

export const AUTH = {
  expiresIn: env.number(`${prefix}AUTH_EXPIRES_IN`) || 3600,
  jwtTokenSecret: env.string(`${prefix}AUTH_SECRET`) || 'namand-secret',
  defaultPassword: env.string(`${prefix}DEFAULT_PASSWORD`) || 'namand-secret',
}
