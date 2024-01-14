import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerModule as NestjsLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    NestjsLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
