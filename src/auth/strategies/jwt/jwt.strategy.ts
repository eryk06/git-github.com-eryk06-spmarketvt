import { RedisService } from '@/configs';
import { SECRET_JWT } from '@/configs/environments';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_JWT,
    });
  }

  async validate(payload: JwtPayload) {
    const { uuid } = payload;

    const access_token = await this.redisService.get(`access-${uuid}`);
    const refresh_token = await this.redisService.get(`refresh-${uuid}`);

    if (!access_token || !refresh_token) {
      throw new UnauthorizedException();
    }

    return payload;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
