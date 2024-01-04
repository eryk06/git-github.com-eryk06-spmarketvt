import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: ROLE[]) => SetMetadata(ROLE_KEY, role);
