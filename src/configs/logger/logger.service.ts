import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { uuidv7 } from 'uuidv7';

export class LoggerService {
  constructor(private readonly logger: winston.Logger) {
    const formatPrint = winston.format.printf(
      ({ level, message, context, requestId, timestamp, metadata }) => {
        return `${timestamp} - [${level}] - ${context} - ${requestId} - ${message} - ${JSON.stringify(metadata)}`;
      },
    );

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        formatPrint,
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: 'src/logs',
          filename: 'application-%DATE%.info.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            formatPrint,
          ),
          level: 'info',
        }),
        new DailyRotateFile({
          dirname: 'src/logs',
          filename: 'application-%DATE%.error.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            formatPrint,
          ),
          level: 'error',
        }),
      ],
    });
  }

  commonParams(params: any) {
    let context: any, req: any, metadata: any;

    if (!Array.isArray(params)) {
      context = params;
    } else {
      [context, req, metadata] = params;
    }

    const requestId = req?.requestId || uuidv7();

    return { context, requestId, metadata };
  }

  log(message: string, params: any) {
    const paramLog = this.commonParams(params);
    const logObject = Object.assign(
      {
        message,
      },
      paramLog,
    );

    this.logger.log(logObject as any);
  }

  error(message: string, params: any) {
    const paramLog = this.commonParams(params);
    const logObject = Object.assign(
      {
        message,
      },
      paramLog,
    );

    this.logger.error(logObject as any);
  }
}
