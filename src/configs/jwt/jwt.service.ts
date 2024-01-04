import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.interface';
import { JwtService as NestJwtService, TokenExpiredError } from '@nestjs/jwt';
import { SECRET_JWT, TOKEN_BUFFER } from '../environments';

@Injectable()
export class JwtService extends NestJwtService {
  signJwt(payload: JwtPayload, isRefreshToken = false) {
    try {
      const expiresIn = isRefreshToken ? '30d' : '15d';
      const token = this.sign(payload, {
        expiresIn,
        secret: SECRET_JWT,
        algorithm: 'HS256'
      });

      const tokenBuffer = Buffer.from(token).toString(TOKEN_BUFFER as any);

      return tokenBuffer;
    } catch (error) {
      throw new TokenExpiredError('Token is expired', error.expiredAt);
    }
  }

  verifyJwt(token: string) {
    try {
      const tokenBuffer = Buffer.from(token, TOKEN_BUFFER as any).toString();

      const payload = this.verify<JwtPayload>(tokenBuffer, {
        secret: SECRET_JWT,
        algorithms: ['HS256']
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
