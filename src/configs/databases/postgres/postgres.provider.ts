import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from '@/configs/environments';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './strategy';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: POSTGRES_HOST,
      port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      logging: ['error', 'warn'],
      keepConnectionAlive: true,
      verboseRetryLog: true,
      nativeDriver: true,
      connectTimeoutMS: 20000,
      retryDelay: 300,
      extra: {
        poolSize: 10,
        max: 10,
        connectionLimit: 10,
        connectionTimeoutMillis: 2000,
        query_timeout: 1000,
        statement_timeout: 1000
      }
    };
  }
}
