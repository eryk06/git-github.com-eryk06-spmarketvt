import { Module } from '@nestjs/common';
import { KeyService } from './services/key.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyEntity, KeyEntity } from './entities';
import { ApiKeyService } from './services';
import { ApiKeyController } from './controllers/api-key.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KeyEntity, ApiKeyEntity])],
  controllers: [ApiKeyController],
  providers: [KeyService, ApiKeyService],
})
export class KeyModule {}
