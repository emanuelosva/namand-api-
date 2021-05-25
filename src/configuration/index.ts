import dotenv from 'dotenv'
import { resolve } from 'path'
import { env } from './getEnv.config'
import { loadPrefix } from './loadPrefix.config'

dotenv.config({
  path: resolve(__dirname, '../../.env'),
})

const prefix = loadPrefix()

export default {
  http: {
    PORT: env.number(`${prefix}PORT`, 3000),
  },
  mongo: {
    uri: env.string(`${prefix}MONGO_URI`, ''),
  },
}
