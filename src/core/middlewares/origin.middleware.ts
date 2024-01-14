import { Request, Response } from 'express';
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpResponseError, ResponseStatus } from '../interfaces';
import * as TEXT from '../constants/text.constant';
import { CROSS_DOMAIN } from '@/app/app.config';
import { NODE_ENV } from '@/configs/environments';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    // production only
    if (NODE_ENV === 'production') {
      const { origin, referer } = request.headers;
      const isAllowed = (field: any) =>
        !field || field.includes(CROSS_DOMAIN.allowedReferer);
      const isAllowedOrigin = isAllowed(origin);
      const isAllowedReferer = isAllowed(referer);
      if (!isAllowedOrigin && !isAllowedReferer) {
        return response.status(HttpStatus.UNAUTHORIZED).jsonp({
          status: ResponseStatus.Error,
          message: TEXT.HTTP_ANONYMOUS_TEXT,
          error: null,
        } as HttpResponseError);
      }
    }

    return next();
  }
}
