import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private apiKeyRepository: Repository<ApiKeyEntity>
  ) {}

  async findById(key: any): Promise<any> {
    try {
      const objKey = await this.apiKeyRepository.findOne({
        where: { key, status: true }
      });
      return objKey;
    } catch (error) {
      throw error;
    }
  }
}
