import { Module } from '@nestjs/common';
import { ThrottlerModule as NestjsThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import {
  REDIS_HOST,
  REDIS_PORT,
  THROTTLE_LIMIT,
  THROTTLE_TTL,
} from '../environments';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestjsThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>('THROTTLE_TTL') || THROTTLE_TTL,
            limit:
              configService.get<number>('THROTTLE_LIMIT') || THROTTLE_LIMIT,
          },
        ],
        storage: new ThrottlerStorageRedisService({
          host: configService.get<string>('REDIS_HOST') || REDIS_HOST,
          port: configService.get<number>('REDIS_PORT') ? +REDIS_PORT : 6379,
        }),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ThrottlerModule {}
