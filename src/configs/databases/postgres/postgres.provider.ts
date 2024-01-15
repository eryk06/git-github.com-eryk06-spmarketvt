import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '@/configs/environments';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST') || POSTGRES_HOST,
      port: this.configService.get<number>('POSTGRES_PORT')
        ? +POSTGRES_PORT
        : 5432,
      username:
        this.configService.get<string>('POSTGRES_USER') || POSTGRES_USER,
      password:
        this.configService.get<string>('POSTGRES_PASSWORD') ||
        POSTGRES_PASSWORD,
      database: this.configService.get<string>('POSTGRES_DB') || POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      logging: ['error', 'warn'],
      keepConnectionAlive: true,
      nativeDriver: true,
      poolSize: 100,
      verboseRetryLog: true,
    };

    // Use synchronize only in development environments
    if (isDev) {
      Reflect.set(options, 'synchronize', true);
    }

    return options;
  }
}
