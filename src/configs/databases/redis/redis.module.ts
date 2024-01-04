import { RedisModule as RedisModuleHost } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { MetadataKey } from 'src/core/constants';
import { RedisConfigService } from './redis.provider';

@Module({
  imports: [
    RedisModuleHost.forRootAsync({
      useClass: RedisConfigService,
      inject: [RedisConfigService]
    })
  ],
  providers: [
    {
      provide: MetadataKey.REDIS,
      useClass: RedisConfigService
    },
    RedisService
  ],
  exports: [RedisModuleHost, RedisService, MetadataKey.REDIS]
})
export class RedisModule {}
