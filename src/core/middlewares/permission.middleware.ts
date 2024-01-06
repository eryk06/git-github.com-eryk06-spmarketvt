import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpBadRequestError } from '../errors';
import { ApiKeyService } from '../../modules';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  private static options: any;

  public static configure(options: any) {
    this.options = options;
  }

  // check permission
  use(permission: any) {
    return (req: any, res: any, next: any) => {
      try {
        if (!req.objKey.permissions) {
          return res.status(403).json({
            message: 'Permission denied'
          });
        }

        const validPermission = req.objKey.permissions.includes(permission);

        if (!validPermission) {
          return res.status(403).json({
            message: 'Permission denied'
          });
        }

        return next();
      } catch (error) {
        next(error);
      }
    };
  }
}
