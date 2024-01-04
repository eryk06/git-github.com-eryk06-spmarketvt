import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApiKeyService } from '../../modules';
import { NextFunction, Request, Response } from 'express';
import { HEADER } from '../enum';
import { HttpBadRequestError } from '../errors';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  // check api key
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const key = req.headers[HEADER.API_KEY]?.toString();
      if (!key) {
        throw new Error('Invalid API key');
      }

      // check object key
      const objKey = await this.apiKeyService.findById(key);
      if (!objKey) {
        throw new HttpBadRequestError('Invalid API key');
      }
      req.headers[HEADER.API_KEY] = objKey;
      return next();
    } catch (error) {
      throw error;
    }
  }

  // check permission
  async usePermission(permission: any): Promise<any> {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        if (!req.headers[HEADER.API_KEY]) {
          throw new HttpBadRequestError('Invalid API key');
        }

        const validPermission =
          req.headers[HEADER.API_KEY].includes(permission);
        if (!validPermission) {
          throw new HttpBadRequestError('Invalid permission');
        }
        return next();
      } catch (error) {
        throw error;
      }
    };
  }
}
