import { MetadataKey, TokenExpires } from '@/core/constants';
import { IRedisType } from '@/core/interfaces';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  set(redisData: IRedisType): Promise<'OK'> {
    const { key, value, expired } = redisData;
    return this.redis.set(key, value, 'EX', expired);
  }

  setNx(redisData: IRedisType): Promise<number> {
    return this.redis.setnx(redisData.key, redisData.value);
  }

  get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async getRefreshToken(sub: string) {
    const key = `RF_TOKEN:${sub}`;
    const getRfToken = await this.get(key);
    if (!getRfToken) {
      throw new NotFoundException('Refresh token not found');
    }
    return getRfToken;
  }

  async getAccessToken(sub: string) {
    const key = `AC_TOKEN:${sub}`;
    const accessToken = await this.get(key);
    if (!accessToken) {
      throw new NotFoundException('Access token not found');
    }
    return accessToken;
  }

  async setRefreshToken(sub: string, token: string) {
    const key = `RF_TOKEN:${sub}`;
    return this.set({
      key,
      value: token,
      expired: TokenExpires.redisRefreshToken,
    });
  }

  async setAccessToken(sub: string, token: string) {
    const key = `AC_TOKEN:${sub}`;
    return this.set({
      key,
      value: token,
      expired: TokenExpires.redisAccessToken,
    });
  }

  async del(key: string) {
    return this.redis.del(key);
  }

  async delRFToken(sub: string) {
    const key = `RF_TOKEN:${sub}`;
    return this.redis.del(key);
  }

  async delAccessToken(sub: string) {
    const key = `AC_TOKEN:${sub}`;
    return this.redis.del(key);
  }
}
