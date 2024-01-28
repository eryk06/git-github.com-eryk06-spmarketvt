import { Controller, Get } from '@nestjs/common';
import { Public } from '../core';
import { NODE_ENV, PORT } from '@/configs/environments';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Public()
  getHello() {
    return {
      data: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        env: NODE_ENV,
        port: PORT,
      },
    };
  }
}
