import { Module } from '@nestjs/common';
import { DiscordModule as DiscordModuleHost } from '@discord-nestjs/core';
import { MetadataKey } from '../../core';
import { DiscordConfigService } from './discord.provider';
import { DiscordGateway } from './discord.gateway';

@Module({
  imports: [
    DiscordModuleHost.forRootAsync({
      useClass: DiscordConfigService,
      inject: [DiscordConfigService],
    }),
  ],
  providers: [
    {
      provide: MetadataKey.DISCORD,
      useClass: DiscordConfigService,
    },
    DiscordGateway,
  ],

  exports: [DiscordGateway, DiscordModuleHost, MetadataKey.DISCORD],
})
export class DiscordModule {}
