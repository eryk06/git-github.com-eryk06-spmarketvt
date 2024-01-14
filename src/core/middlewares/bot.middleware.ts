import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createLogger } from '../utils';
import { NODE_ENV } from '../../configs';

const logger = createLogger({
  scope: 'Service Discord',
  time: NODE_ENV === 'development',
});

@Injectable()
export class BotMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      logger.log('Bot middleware');
      return next();
    } catch (error) {
      next(error);
    }
  }
}
