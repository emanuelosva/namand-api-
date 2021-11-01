import { Injectable, Global } from '@nestjs/common'
import {
  Logger as LoggerInterface,
  createLogger,
  format,
  transports,
} from 'winston'
import { APP } from '@namand/configuration'

@Global()
@Injectable()
export class Logger {
  private _logger: LoggerInterface

  constructor(private moduleName = 'namand') {
    this._logger = createLogger({
      level: 'debug',
      format: format.json(),
    })
    if (!APP.isProdMode) {
      this._logger.add(
        new transports.Console({
          format: format.colorize(),
        }),
      )
    }
  }

  info(message: string, ...args) {
    this._logger.info(`[@${this.moduleName}] -> ${message}`, ...args)
  }

  warn(message: string, ...args) {
    this._logger.warn(`[@${this.moduleName}] -> ${message}`, ...args)
  }

  debug(message: string, ...args) {
    this._logger.debug(`[@${this.moduleName}] -> ${message}`, ...args)
  }

  error(message: string, ...args) {
    this._logger.error(`[@${this.moduleName}] -> ${message}`, ...args)
  }
}
