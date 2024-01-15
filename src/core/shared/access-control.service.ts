import { Injectable } from '@nestjs/common';
import { ROLE } from '../enum';

interface IsAuthorizedParams {
  currentRole: ROLE;
  requiredRole: ROLE;
}

@Injectable()
export class AccessControlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([ROLE.USER, ROLE.SHOP, ROLE.ADMIN]);
    this.buildRoles([ROLE.ADMIN]);
  }

  private buildRoles(roles: ROLE[]) {
    const hierarchy: Map<string, number> = new Map();

    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });

    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (const hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);

      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }

    return false;
  }
}
