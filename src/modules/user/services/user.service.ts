import { RedisService } from '@/configs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { InsertResult, Repository } from 'typeorm';
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

  // fake create user
  async createUser(data: any): Promise<InsertResult> {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .from(UserEntity, 'user')
        .insert()
        .values({
          ...data,
        })
        .execute();

      if (!user) throw new BadRequestException('Cannot create user');

      return user;
    } catch (error) {
      throw error;
    }
  }

  // find one user
  async getOne(where: any): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { ...where } });
    } catch (error) {
      throw error;
    }
  }

  // find one user or fail
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

  // update full name with uuid
  async updateFullNameUser(uuid: string, full_name: string): Promise<any> {
    try {
      return await this.userRepository.update({ uuid }, { full_name });
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
