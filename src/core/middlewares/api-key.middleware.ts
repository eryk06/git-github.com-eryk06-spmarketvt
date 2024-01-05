import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApiKeyService } from '../../modules';
import { HEADER } from '../enum';
import { HttpBadRequestError } from '../errors';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  // check api key
  async use(req: any, res: any, next: any): Promise<any> {
    try {
      const key = req.headers[HEADER.API_KEY]?.toString();
      if (!key) {
        throw new HttpBadRequestError('Invalid API key');
      }

      // check object key
      const objKey = await this.apiKeyService.findById(key);
      if (!objKey) {
        throw new HttpBadRequestError('Invalid API key');
      }
      req.objKey = objKey;
      return next();
    } catch (error) {
      throw error;
    }
  }
}
