import { Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  RequestMethod,
} from '@nestjs/common';
import { CROSS_DOMAIN, PROJECT } from '@/apps/app.config';
import { NODE_ENV } from '@/configs/environments';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    const getMethod = (method: any) => RequestMethod[method];
    const origins = request.headers.origin;
    const origin = (Array.isArray(origins) ? origins[0] : origins) || '';

    const allowedOrigins = [...CROSS_DOMAIN.allowedOrigins];
    const allowedMethods = [
      RequestMethod.GET,
      RequestMethod.HEAD,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.POST,
      RequestMethod.DELETE,
    ];
    const allowedHeaders = [
      'Authorization',
      'Origin',
      'No-Cache',
      'X-Csrf-Token',
      'X-Api-Key',
      'X-Client-Id',
      'X-User-Id',
      'X-Requested-With',
      'If-Modified-Since',
      'Pragma',
      'Last-Modified',
      'Cache-Control',
      'Expires',
      'Content-Type',
      'X-E4M-With',
      'Sentry-Trace',
      'Baggage',
    ];

    // Allow Origin
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      NODE_ENV === 'development'
    ) {
      response.setHeader('Access-Control-Allow-Origin', origin || '*');
    }

    // Headers
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
    response.header(
      'Access-Control-Allow-Methods',
      allowedMethods.map(getMethod).join(','),
    );
    response.header('Access-Control-Max-Age', '1728000');
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.header('X-Powered-By', `${PROJECT.name} ${PROJECT.version}`);

    // OPTIONS Request
    if (request.method === getMethod(RequestMethod.OPTIONS)) {
      return response.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      return next();
    }
  }
}
