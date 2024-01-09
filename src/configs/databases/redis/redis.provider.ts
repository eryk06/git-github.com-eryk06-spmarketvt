import { REDIS_HOST, REDIS_PORT } from '@/configs/environments';
import {
  RedisModuleOptions,
  RedisModuleOptionsFactory
} from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createRedisModuleOptions(): RedisModuleOptions | Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.configService.get<string>('REDIS_HOST') || REDIS_HOST,
        port: this.configService.get<number>('REDIS_PORT') ? +REDIS_PORT : 6379
      }
    };
  }
}
