import { RedisService } from '@/configs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../../interfaces';
import { access_token_public_key } from '@/constraints/jwt.constraints';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: access_token_public_key,
    });
  }

  async validate(payload: JwtPayload) {
    const { uuid } = payload;

    const access_token = await this.redisService.get(`access-${uuid}`);
    const refresh_token = await this.redisService.get(`refresh-${uuid}`);

    if (!access_token || !refresh_token) {
      throw new UnauthorizedException('Unauthorized');
    }

    return payload;
  }
}
