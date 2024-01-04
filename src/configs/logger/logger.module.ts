import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerModule as LoggerModuleHost } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModuleHost.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty'
        }
      }
    })
  ],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {}
