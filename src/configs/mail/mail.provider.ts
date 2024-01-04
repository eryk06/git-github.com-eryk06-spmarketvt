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

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: MAIL_HOST,
        port: MAIL_PORT,
        date: new Date(),
        secure: false,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD
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
