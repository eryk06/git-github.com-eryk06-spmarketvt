import {
  ASYNC_RBAC_REQUEST_FILTER,
  IStorageRbac,
  RBAC_REQUEST_FILTER,
} from 'nestjs-rbac';

export const RBAC: IStorageRbac = {
  roles: ['admin', 'user'],
  permissions: {
    permission1: ['create', 'update', 'delete'],
    permission2: ['create', 'update', 'delete'],
    permission3: ['filter1', 'filter2', RBAC_REQUEST_FILTER],
    permission4: ['create', 'update', 'delete'],
    permission5: ['ASYNC_filter1', 'ASYNC_filter2', ASYNC_RBAC_REQUEST_FILTER],
  },
  grants: {
    admin: ['&user', 'permission1', 'permission3', 'permission5'],
    user: [
      '&userRoot',
      'permission2',
      'permission1@create',
      'permission3@filter1',
      'permission5@ASYNC_filter1',
    ],
    userRoot: ['permission4'],
  },
  filters: {
    filter1: (req: any, res: any, next: () => void) => {
      console.log('filter1');
      next();
    },
    filter2: (req: any, res: any, next: () => void) => {
      console.log('filter2');
      next();
    },
    ASYNC_filter1: async (req: any, res: any, next: () => void) => {
      console.log('ASYNC_filter1');
      next();
    },
    ASYNC_filter2: async (req: any, res: any, next: () => void) => {
      console.log('ASYNC_filter2');
      next();
    },
  },
};
