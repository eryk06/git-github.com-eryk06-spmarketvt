import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER
} from '../environments';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: this.configService.get<string>('MAIL_HOST') || MAIL_HOST,
        port: this.configService.get<number>('MAIL_PORT') ? +MAIL_PORT : 587,
        date: new Date(),
        secure: false,
        auth: {
          user: this.configService.get<string>('MAIL_USER') || MAIL_USER,
          pass: this.configService.get<string>('MAIL_PASSWORD') || MAIL_PASSWORD
        }
      },
      template: {
        dir: join(__dirname, 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    };
  }
}
