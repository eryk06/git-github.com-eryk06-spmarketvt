import { RedisService } from '@/configs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  name = 'user';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
  ) {
    super(userRepository);
  }

  async getOne(where: any): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { ...where } });
    } catch (error) {
      throw error;
    }
  }

  async getOneOrFail(where: any): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ where: { ...where } });
    } catch (error) {
      throw error;
    }
  }

  // find all users
  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const slaveQueryRunner =
        this.userRepository.manager.connection.createQueryRunner('slave');
      const users = await this.userRepository
        .createQueryBuilder('user', slaveQueryRunner)
        .cache(this.redisService, 60 * 60 * 24)
        .getMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  // delete user
  async deleteUser(uuid: string): Promise<any> {
    try {
      await this.userRepository.delete({ uuid });
      return {
        message: 'Delete user successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
