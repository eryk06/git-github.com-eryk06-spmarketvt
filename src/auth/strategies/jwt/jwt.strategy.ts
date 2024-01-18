import { RedisService } from '@/configs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from '../../interfaces';
import { UserService } from '../../../modules';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKeyProvider: () => {
        return process.env.JWT_SECRET;
      },
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload) {
    const { uuid } = payload;

    const user = await this.userService.getOneOrFail({ uuid });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    // const access_token = await this.redisService.get(`access-${uuid}`);
    // const refresh_token = await this.redisService.get(`refresh-${uuid}`);

    // if (!access_token || !refresh_token) {
    //   throw new UnauthorizedException('Unauthorized');
    // }

    return payload;
  }
}
