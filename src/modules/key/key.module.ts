import { Module } from '@nestjs/common';
import { KeyService } from './services/key.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyEntity } from './entities';
import { ApiKeyService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([KeyEntity])],
  controllers: [],
  providers: [KeyService]
})
export class KeyModule {}
