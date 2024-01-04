import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TerminusLogger } from './health-logger.service';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: TerminusLogger,
      errorLogStyle: 'pretty',
      gracefulShutdownTimeoutMs: 1000
    }),
    ConfigModule,
    HttpModule
  ],
  controllers: [HealthController]
})
export class HealthModule {}
