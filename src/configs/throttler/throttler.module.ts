import { Module } from '@nestjs/common';
import { ThrottlerModule as ThrottlerModuleHost } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import {
  REDIS_HOST,
  REDIS_PORT,
  THROTTLE_LIMIT,
  THROTTLE_TTL
} from '../environments';

@Module({
  imports: [
    ThrottlerModuleHost.forRootAsync({
      useFactory: () => ({
        throttlers: [
          {
            ttl: THROTTLE_TTL,
            limit: THROTTLE_LIMIT
          }
        ],
        storage: new ThrottlerStorageRedisService({
          host: REDIS_HOST,
          port: REDIS_PORT ? +REDIS_PORT : 6379
        })
      })
    })
  ]
})
export class ThrottlerModule {}
