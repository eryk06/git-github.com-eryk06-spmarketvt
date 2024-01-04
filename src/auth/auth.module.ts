import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/entities';
import {
  CryptoService,
  MailModule,
  RedisService,
  RedisModule
} from 'src/configs';
import { KeyEntity, KeyService, UserModule, UserService } from 'src/modules';
import { AuthController } from './controllers';
import { GoogleStrategy, JwtStrategy, LocalStrategy } from './strategies';
import { SessionSerializer } from './serializer';
import { PassportModule } from '@nestjs/passport';
import { Authentication } from '../core/middlewares/authentication.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, KeyEntity]),
    RedisModule,
    UserModule,
    MailModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    KeyService,
    UserService,
    RedisService,
    CryptoService,
    JwtStrategy,
    LocalStrategy,
    SessionSerializer,
    GoogleStrategy
  ],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Authentication).forRoutes('/auth/logout');
  }
}
