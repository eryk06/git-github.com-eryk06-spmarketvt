import { SetMetadata } from '@nestjs/common';
import { GUEST_REQUEST_METADATA } from '../constants';
import { reflector } from '../constants/reflector.constant';

export interface GuestRequestOption<T = any> {
  only?: T[];
  default?: T;
}

export function WhenGuest(option: GuestRequestOption) {
  return (target: any, propertyName: string) => {
    SetMetadata(GUEST_REQUEST_METADATA, {
      ...reflector.get(GUEST_REQUEST_METADATA, target),
      [propertyName]: option,
    })(target);
  };
}

export const getGuestRequestOptions = (
  target: any,
): Record<string, GuestRequestOption> => {
  return reflector.get(GUEST_REQUEST_METADATA, target);
};
