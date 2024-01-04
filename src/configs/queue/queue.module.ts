import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { QueueConfigService } from './queue.provider';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useClass: QueueConfigService,
      inject: [QueueConfigService]
    })
  ],
  providers: [QueueConfigService],
  exports: [QueueConfigService]
})
export class QueueModule {}
