import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory
} from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { TOKEN_BOT } from '../environments';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption | Promise<DiscordModuleOption> {
    return {
      token: TOKEN_BOT,
      discordClientOptions: {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers
        ]
      },
      autoLogin: true
    };
  }
}
