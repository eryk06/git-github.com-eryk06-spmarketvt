import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyEntity } from '../entities';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private apiKeyRepository: Repository<ApiKeyEntity>
  ) {}

  async findById(key: any): Promise<any> {
    try {
      // const newKey = this.apiKeyRepository.create({
      //   key: crypto.randomBytes(64).toString('hex'),
      //   pesmissions: ['0000']
      // });

      // await this.apiKeyRepository.save(newKey);

      // console.log(newKey);

      const objKey = await this.apiKeyRepository.findOne({
        where: { key, status: true }
      });

      return objKey;
    } catch (error) {
      throw error;
    }
  }
}
