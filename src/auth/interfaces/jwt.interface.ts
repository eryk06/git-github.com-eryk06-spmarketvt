import { ROLE } from '@/core';

export interface JwtPayload {
  uuid: string;
  email: string;
  role: ROLE;
  [key: string]: any;
}
