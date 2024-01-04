import lodash from 'lodash';
import { SetMetadata } from '@nestjs/common';
import { NULL, reflector } from '../constants';
import * as META from '../constants/meta.constant';

export interface CacheOptions {
  key: string;
  ttl?: number;
}

export function Cache(option: CacheOptions): MethodDecorator;
export function Cache(key: string, ttl?: number): MethodDecorator;
export function Cache(...args: any[]) {
  const option = args[0];
  const isOption = (value: any): value is CacheOptions =>
    lodash.isObject(value);
  const key: string = isOption(option) ? option.key : option;
  const ttl: number = isOption(option) ? option.ttl : args[1] || NULL;
  return (_: any, __: any, descriptor: PropertyDescriptor) => {
    if (key) {
      SetMetadata(META.CACHE_KEY_METADATA, key)(descriptor.value);
    }
    if (ttl) {
      SetMetadata(META.CACHE_TTL_METADATA, ttl)(descriptor.value);
    }
    return descriptor;
  };
}

export const getCacheKey = (target: any): CacheOptions['key'] => {
  return reflector.get(META.CACHE_KEY_METADATA, target);
};

export const getCacheTTL = (target: any): CacheOptions['ttl'] => {
  return reflector.get(META.CACHE_TTL_METADATA, target);
};
