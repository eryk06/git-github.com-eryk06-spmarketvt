import { REDIS_HOST, REDIS_PORT } from '@/configs/environments';
import {
  RedisModuleOptions,
  RedisModuleOptionsFactory
} from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  createRedisModuleOptions(): RedisModuleOptions | Promise<RedisModuleOptions> {
    return {
      config: {
        host: REDIS_HOST,
        port: REDIS_PORT ? +REDIS_PORT : 6379
      }
    };
  }
}
