import * as jwt from 'jsonwebtoken';
import * as ms from 'ms';
import base64url from 'base64url';
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from '../../configs';

async function createToken({ payload, publicKey, privateKey }): Promise<any> {
  try {
    const access_token_expiration_ms = ms(ACCESS_TOKEN_EXPIRATION_TIME);
    const refresh_token_expiration_ms = ms(REFRESH_TOKEN_EXPIRATION_TIME);

    const access_token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: access_token_expiration_ms,
    });

    const refresh_token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: refresh_token_expiration_ms,
    });

    const urlSafeAccess = base64url.encode(access_token);
    const urlSafeRefresh = base64url.encode(refresh_token);

    jwt.verify(access_token, publicKey, (error: any, decoded: any) => {
      if (error) {
        throw error;
      } else {
        console.log(decoded);
      }
    });

    return { access_token: urlSafeAccess, refresh_token: urlSafeRefresh };
  } catch (error) {
    throw error;
  }
}

export { createToken };
