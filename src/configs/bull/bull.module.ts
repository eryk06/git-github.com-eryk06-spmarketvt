import { BullModule as NestjsBullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { BullConfigService } from './bull.provider';

@Global()
@Module({
  imports: [
    NestjsBullModule.forRootAsync({
      useClass: BullConfigService,
      inject: [BullConfigService],
    }),
  ],
  providers: [BullConfigService],
  exports: [BullConfigService],
})
export class BullModule {}
