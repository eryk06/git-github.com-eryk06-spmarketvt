import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './postgres.provider';
import { HttpBadRequestError, MetadataKey } from '@/core';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
      async dataSourceFactory(options) {
        if (!options) {
          throw new HttpBadRequestError('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
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
