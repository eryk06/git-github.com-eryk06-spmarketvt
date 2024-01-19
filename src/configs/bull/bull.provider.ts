import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '../environments';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration():
    | BullRootModuleOptions
    | Promise<BullRootModuleOptions> {
    return {
      redis: {
        host: this.configService.get<string>('REDIS_HOST') || REDIS_HOST,
        port: this.configService.get<number>('REDIS_PORT') ? REDIS_PORT : 6379,
      },
      prefix: 'queue',
      defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: false,
      },
    };
  }
}
