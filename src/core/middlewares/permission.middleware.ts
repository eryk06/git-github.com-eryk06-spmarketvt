import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  private static options: any;

  public static configure(options: any) {
    this.options = options;
  }

  // check permission
  use(req: any, res: any, next: any) {
    try {
      const permission = PermissionMiddleware.options.permission;

      if (!req.objKey.pesmissions) {
        return res.status(403).json({
          message: 'Permission denied',
        });
      }

      const validPermission = req.objKey.pesmissions.includes(permission);

      if (!validPermission) {
        return res.status(403).json({
          message: 'Permission denied',
        });
      }

      return next();
    } catch (error) {
      next(error);
    }
  }
}
