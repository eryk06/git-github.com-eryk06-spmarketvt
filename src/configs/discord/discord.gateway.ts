import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';
import { createLogger } from '@/core';
import { NODE_ENV } from '@/configs';

const logger = createLogger({
  scope: 'Service Discord',
  time: NODE_ENV === 'development',
});

@Injectable()
export class DiscordGateway {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  async onReady(): Promise<void> {
    logger.info(`Logged in as ${this.client.user.tag}!`);
  }

  @On('message')
  async onMessage(message: Message): Promise<void> {
    if (message.author.bot) return;

    if (message.content === 'hello') {
      await message.reply('Can i help you?');
    }
  }
}
