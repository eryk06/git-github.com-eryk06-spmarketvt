import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyEntity } from '../entities';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(KeyEntity)
    private keyRepository: Repository<KeyEntity>
  ) {}

  @Transactional()
  async createKeyToken({
    uuid,
    publicKey,
    refreshToken
  }: {
    uuid: any;
    publicKey: string;
    refreshToken?: any;
  }): Promise<any> {
    try {
      const tokens = await this.keyRepository.findOne({
        where: { user: uuid }
      });

      if (!tokens) {
        const tokens = await this.keyRepository.save({
          user: uuid,
          publicKey,
          refreshToken
        });
        return tokens ? tokens.publicKey : null;
      }

      tokens.publicKey = publicKey;

      if (refreshToken) {
        tokens.refreshToken = refreshToken;
      }

      await this.keyRepository.save(tokens);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }

  async findByKeyUid(uuid: any): Promise<any> {
    try {
      const keyUid = await this.keyRepository.findOne({
        where: { user: uuid }
      });
      return keyUid;
    } catch (error) {
      throw error;
    }
  }

  async removeKeyByUid(uuid: any): Promise<any> {
    try {
      const keyUid = await this.keyRepository.remove(uuid);
      return keyUid;
    } catch (error) {
      throw error;
    }
  }
}
