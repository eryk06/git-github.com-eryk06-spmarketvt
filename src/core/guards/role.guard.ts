// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { ROLE } from '../enum/roles.enum';
// import { Reflector } from '@nestjs/core';
// import { AccessControlService } from '../shared/access-control.service';
// import { Observable } from 'rxjs';
// import { ROLE_KEY } from '../decorators';

// export interface ITokenDTO {
//   uuid: string;
//   role: ROLE;
// }

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private accessControlService: AccessControlService,
//   ) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLE_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     const request = context.switchToHttp().getRequest();
//     const access_token = request['access_token'] as ITokenDTO;

//     for (const role of requiredRoles) {
//       const result = this.accessControlService.isAuthorized({
//         requiredRole: role,
//         currentRole: access_token.role,
//       });

//       if (result) return true;
//     }

//     return false;
//   }
// }
