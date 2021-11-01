/**
 * DB provider.
 * @description MongoDB connection.
 */

import { mongoose } from '@typegoose/typegoose'
import { DB_CONNECTION_KEY } from '@namand/constants'
import { MONGO_DB } from '@namand/configuration'
import { Logger } from '@namand/utils'

export const databaseProvider = {
  provide: DB_CONNECTION_KEY,
  useFactory: async () => {
    const RECONNECT_INTERVAL = 6000
    const MAX_RETRYS_RECCONECTION = 4
    let retryTimes = 0
    let reconnectionTask = null

    const connection = () =>
      mongoose.connect(MONGO_DB.uri, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise,
      })

    const logger = new Logger()
    mongoose.connection.on('connection', () =>
      logger.info('Connecting to MongoDB'),
    )

    mongoose.connection.on('open', () => {
      logger.info('MongoDB connection open')
      clearTimeout(reconnectionTask)
      reconnectionTask = null
      retryTimes = 0
    })

    mongoose.connection.on('disconnected', () => {
      if (retryTimes < MAX_RETRYS_RECCONECTION) {
        logger.info(`New reconnection intent on ${RECONNECT_INTERVAL / 1000}s`)
        reconnectionTask = setTimeout(connection, RECONNECT_INTERVAL)
        retryTimes += 1
      } else {
        logger.info('Max number of retry connections')
        mongoose.disconnect()
        process.exit(1)
      }
    })

    mongoose.connection.on('error', () => {
      logger.info('Connection error')
      mongoose.disconnect()
      process.exit(1)
    })

    return await connection()
  },
}
