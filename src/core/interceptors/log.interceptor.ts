import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const res = context.switchToHttp().getResponse();
    const delay = Date.now() - now;

    const contentLength =
      req.headers && req.headers['content-length']
        ? req.headers['content-length']
        : '0';

    Logger.debug(
      `${req.ip} ${new Date()} ${method} ${url} ${req.protocol} ${
        res.statusCode
      } ${contentLength} *** ${
        req.headers && req.headers.host ? req.headers.host.split(':')[1] : 'N/A'
      } ${delay}ms`
    );

    return next.handle();
  }
}
