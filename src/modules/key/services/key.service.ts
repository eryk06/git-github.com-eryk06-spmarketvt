import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(KeyEntity)
    private keyRepository: Repository<KeyEntity>,
  ) {}

  async createKeyToken({
    uuid,
    publicKey,
    refresh_token,
  }: {
    uuid?: any;
    publicKey?: string;
    refresh_token?: string;
  }): Promise<any> {
    try {
      const masterQueryRunner =
        this.keyRepository.manager.connection.createQueryRunner('master');

      const publicKeyString = publicKey.toString();

      const tokens = await this.keyRepository
        .createQueryBuilder('key', masterQueryRunner)
        .setQueryRunner(masterQueryRunner)
        .where('key.user = :uuid', { uuid })
        .getOne();

      if (!tokens) {
        const tokens = await this.keyRepository.save({
          user: uuid,
          publicKey: publicKeyString,
        });

        return tokens ? tokens.publicKey : null;
      }

      tokens.publicKey = publicKey;

      await this.keyRepository.save(tokens);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }

  async findByKeyUid(uuid: any): Promise<any> {
    try {
      const keyUid = await this.keyRepository.findOne({
        where: { user: uuid },
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
