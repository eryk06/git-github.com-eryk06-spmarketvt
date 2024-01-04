import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailConfigService } from './mail.provider';
import { MetadataKey } from '@/core';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService,
      inject: [MailConfigService]
    })
  ],
  providers: [
    {
      provide: MetadataKey.MAILER,
      useClass: MailConfigService
    },
    MailConfigService
  ],
  exports: [MailerModule, MailConfigService, MetadataKey.MAILER]
})
export class MailModule {}
