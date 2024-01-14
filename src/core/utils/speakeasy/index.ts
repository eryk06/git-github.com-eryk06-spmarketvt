import {
  SPEAKEASY_ALGORITHM,
  SPEAKEASY_ENCODING,
  SPEAKEASY_LENGTH,
  SPEAKEASY_SECRET,
  SPEAKEASY_STEP,
} from '@/configs/environments';
import * as speakeasy from 'speakeasy';

export class SpeakeasyUtil {
  static generateSecret(): string {
    return speakeasy.generateSecret({
      length: 20,
      name: SPEAKEASY_SECRET,
      issuer: SPEAKEASY_SECRET,
    }).base32;
  }

  static verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      token,
      encoding: SPEAKEASY_ENCODING as any,
      algorithm: SPEAKEASY_ALGORITHM as any,
      digits: SPEAKEASY_LENGTH,
      step: SPEAKEASY_STEP,
      epoch: Date.now(),
      time: Date.now(),
    });
  }

  static generateToken(secret: string): string {
    return speakeasy.totp({
      secret,
      encoding: SPEAKEASY_ENCODING as any,
      algorithm: SPEAKEASY_ALGORITHM as any,
      digits: SPEAKEASY_LENGTH,
      epoch: Date.now(),
      step: SPEAKEASY_STEP,
      time: Date.now(),
    });
  }
}
