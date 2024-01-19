import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from '../../interfaces';
import { UserService } from '../../../modules';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKeyProvider: (req, done) => {
        const { authorization } = req.headers;

        if (!authorization) {
          return done(new UnauthorizedException('Unauthorized'), null);
        }

        const token = authorization.split(' ')[1];

        return done(null, token);
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
