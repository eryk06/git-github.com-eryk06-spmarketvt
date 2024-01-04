import { Injectable, NestMiddleware } from '@nestjs/common';
import { KeyService } from '../../modules';
import { HttpUnauthorizedError } from '../errors';
import { HEADER } from '../enum';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

@Injectable()
export class Authentication implements NestMiddleware {
  constructor(private readonly keyService: KeyService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const userId = req.headers[HEADER.CLIENT_ID];
      if (!userId) {
        throw new HttpUnauthorizedError('Invalid user id');
      }

      const keyStore = await this.keyService.findByKeyUid(userId);

      if (!keyStore) {
        throw new HttpUnauthorizedError('Invalid user id');
      }

      const access_token = req.headers[HEADER.AUTHORIZATION];

      if (!access_token) {
        throw new HttpUnauthorizedError('Invalid token');
      }

      try {
        const decoded = jwt.verify(access_token as string, keyStore.publicKey);
        if (userId !== decoded['uuid']) {
          throw new HttpUnauthorizedError('Invalid token');
        }
        req.headers['X-CLIENT-ID'] = keyStore;
      } catch (error) {
        throw new HttpUnauthorizedError('Invalid token');
      }
    } catch (error) {
      throw error;
    }
  }
}
