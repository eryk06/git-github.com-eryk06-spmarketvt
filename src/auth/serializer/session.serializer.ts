import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '@/modules';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: UserEntity,
    done: (err: Error, user: UserEntity) => void
  ) {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
    done(null, payload);
  }
}
