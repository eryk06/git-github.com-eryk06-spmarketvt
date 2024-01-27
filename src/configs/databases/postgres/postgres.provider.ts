import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  POSTGRESQL_DATABASE,
  POSTGRESQL_MASTER_HOST,
  POSTGRESQL_MASTER_PORT_NUMBER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_USERNAME,
} from '../../environments';
import { SnakeNamingStrategy } from './strategy';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      replication: {
        master: {
          host: POSTGRESQL_MASTER_HOST,
          port: POSTGRESQL_MASTER_PORT_NUMBER || 5432,
          username: POSTGRESQL_USERNAME,
          password: POSTGRESQL_PASSWORD,
          database: POSTGRESQL_DATABASE,
        },
        slaves: [
          {
            host: 'postgresql-slave',
            port: POSTGRESQL_MASTER_PORT_NUMBER || 5432,
            username: 'repl_user',
            password: 'repl_user',
            database: POSTGRESQL_DATABASE,
          },
        ],
      },
      cache: {
        type: 'ioredis',
        options: {
          host: 'redis',
          port: 6379,
        },
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      migrations: ['src/configs/databases/migrations/*{.ts,.js}'],
      logging: ['error', 'warn'],
      keepConnectionAlive: true,
      poolSize: 100,
    };

    if (isDev) {
      Reflect.set(options, 'synchronize', true);
    }

    return options;
  }
}
