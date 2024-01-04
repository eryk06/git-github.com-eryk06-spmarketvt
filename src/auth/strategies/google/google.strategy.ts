import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '@/modules';
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JwtPayload
} from '@/configs';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    try {
      if (!profile) {
        throw new NotFoundException('Invalid google account');
      }

      const { email, picture } = profile;

      const user = {
        email: email[0].value,
        picture: picture[0].value,
        accessToken,
        refreshToken
      };

      const payload: JwtPayload = await this.userService.getOne({
        email: user.email
      });

      done(null, payload);

      return payload;
    } catch (error) {
      throw error;
    }
  }
}
