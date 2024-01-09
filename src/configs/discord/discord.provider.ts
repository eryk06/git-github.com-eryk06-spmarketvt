import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory
} from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { TOKEN_BOT } from '../environments';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createDiscordOptions(): DiscordModuleOption | Promise<DiscordModuleOption> {
    return {
      token: this.configService.get<string>('TOKEN_BOT') || TOKEN_BOT,
      discordClientOptions: {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.DirectMessages
        ]
      },
      autoLogin: true
    };
  }
}
