import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyController } from './controllers/api-key.controller';
import { ApiKeyEntity, KeyEntity } from './entities';
import { ApiKeyService } from './services';
import { KeyService } from './services/key.service';
import { UserEntity } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([KeyEntity, ApiKeyEntity])],
  controllers: [ApiKeyController],
  providers: [KeyService, ApiKeyService],
})
export class KeyModule {}
