import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/entities';
import { RedisService, RedisModule } from 'src/configs';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RedisModule],
  providers: [UserService, RedisService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
