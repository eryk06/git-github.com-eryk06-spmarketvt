import { JwtPayload } from '@/configs';
import { UserService } from '@/modules';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compareHash } from '@/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string) {
    try {
      const where = { email };

      const user = await this.userService.getOneOrFail(where);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isMatchPassword = compareHash(password, user.password);

      if (!isMatchPassword) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload: JwtPayload = {
        uuid: user.uuid,
        email: user.email,
        role: user.role
      };

      return payload;
    } catch (error) {
      throw error;
    }
  }
}
