import { Inject, Injectable } from '@nestjs/common';
import { PARAMS_PROVIDER_TOKEN, Params, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService extends PinoLogger {
  constructor(@Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
    super({});
  }

  trace(message: any, ...optionalParams: any[]) {
    this.debug(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.logger.fatal(message, ...optionalParams);
  }

  flush() {
    this.logger.flush();
  }
}
