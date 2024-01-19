import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './strategy';
import { ConfigService } from '@nestjs/config';
import {
  POSTGRESQL_DATABASE,
  POSTGRESQL_MASTER_HOST,
  POSTGRESQL_MASTER_PORT_NUMBER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_REPLICATION_PASSWORD,
  POSTGRESQL_REPLICATION_USER,
  POSTGRESQL_SLAVE_HOST,
  POSTGRESQL_SLAVE_PORT_NUMBER,
  POSTGRESQL_USERNAME,
} from '../../environments';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      replication: {
        master: {
          host: 'postgresql-master',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
        },
        slaves: [
          {
            host: 'postgresql-slave',
            port: 5432,
            username: 'repl_user',
            password: 'repl_user',
            database: 'postgres',
          },
        ],
      },
      cache: {
        type: 'redis',
        options: {
          socket: {
            host: 'redis',
            port: 6379,
          },
        },
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      logging: ['error', 'warn'],
      keepConnectionAlive: true,
      poolSize: 100,
    };

    // Use synchronize only in development environments
    if (isDev) {
      Reflect.set(options, 'synchronize', true);
    }

    return options;
  }
}
