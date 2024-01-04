import { Controller, Get } from '@nestjs/common';
import { Public } from '../core';
import { I18n, I18nContext } from 'nestjs-i18n';
import { NODE_ENV, PORT } from '@/configs/environments';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Public()
  getHello(@I18n() i18n: I18nContext<any>) {
    return {
      data: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        env: NODE_ENV,
        port: PORT,
        i18n: i18n.lang
      }
    };
  }
}
