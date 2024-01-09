import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import {
  CloudinaryModule,
  ConfigModule,
  DiscordModule,
  FirebaseModule,
  HealthModule,
  LoggerModule,
  MailModule,
  RedisModule,
  StaticModule,
  ThrottlerModule
} from '../configs';
import { MulterModule } from '@nestjs/platform-express';
import {
  BotMiddleware,
  CorsMiddleware,
  CsurfMiddleware,
  LoggerMiddleware,
  OriginMiddleware
} from '../core';
import { QueueModule } from '../configs/queue';
import { SearchModule } from '../configs/search';
import { PostgresModule } from '../configs/databases/postgres';
import { AppController } from './app.controller';
import { ClsModule } from 'nestjs-cls';
import { ChatModule } from '@/modules';
import { ApiKeyEntity, ApiKeyService, KeyModule } from '../modules/key';
import { ApiKeyMiddleware } from '../core/middlewares/api-key.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionMiddleware } from '../core/middlewares/permission.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApiKeyEntity]),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),

    MulterModule.register({
      dest: './upload'
    }),

    // CONFIGS
    ConfigModule,
    PostgresModule,
    RedisModule,
    QueueModule,
    StaticModule,
    SearchModule,
    ThrottlerModule,
    HealthModule,
    LoggerModule,
    CloudinaryModule,
    MailModule,
    FirebaseModule,
    DiscordModule,

    // MODULES
    AuthModule,
    UserModule,
    KeyModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [ApiKeyService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    CsurfMiddleware.configure({
      cookie: true,
      httpOnly: true
    });
    PermissionMiddleware.configure({
      permission: '0000'
    });
    consumer
      .apply(
        LoggerMiddleware,
        OriginMiddleware,
        CorsMiddleware,
        ApiKeyMiddleware
        // PermissionMiddleware
        // BotMiddleware
        // CsurfMiddleware
      )
      .forRoutes('*');
  }
}
