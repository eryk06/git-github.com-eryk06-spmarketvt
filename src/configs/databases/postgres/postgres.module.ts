import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './postgres.provider';
import { MetadataKey } from '@/core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  providers: [
    {
      provide: MetadataKey.POSTGRES,
      useClass: PostgresConfigService,
    },
    PostgresConfigService,
  ],
  exports: [TypeOrmModule, PostgresConfigService, MetadataKey.POSTGRES],
})
export class PostgresModule {}
