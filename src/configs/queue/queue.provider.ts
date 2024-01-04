import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '../environments';

@Injectable()
export class QueueConfigService implements SharedBullConfigurationFactory {
  createSharedConfiguration():
    | BullRootModuleOptions
    | Promise<BullRootModuleOptions> {
    return {
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT ? +REDIS_PORT : 6379
      },
      prefix: 'queue',
      defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: false
      }
    };
  }
}
